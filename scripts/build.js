// const execSync = require("child_process").execSync;
const rollup = require("rollup");
const fs = require("fs-extra");
const path = require("path");
const babel = require("rollup-plugin-babel");
const replace = require("@rollup/plugin-replace");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const pkgJson = require("../package.json");
const ms = require("ms");
const chalk = require("chalk");

const nameParts = pkgJson.name.split("/");
const pkgName = nameParts[nameParts.length - 1];
const BABEL_EXTENSIONS = [".mjs", ".js", ".ts"];
const NODE_RESOLVE_EXTENSIONS = [...BABEL_EXTENSIONS, ".json", ".node"];

const stdout = console.log.bind(console);
// const stderr = console.error.bind(console);

bundleAll([
	{
		outputOptions: {
			file: `dist/${pkgName}.esm.js`,
			format: "esm",
			sourcemap: true,
		},
	},
	{
		env: "production",
		outputOptions: {
			file: `dist/${pkgName}.cjs.prod.js`,
			format: "cjs",
		},
	},
	{
		env: "development",
		outputOptions: {
			file: `dist/${pkgName}.cjs.dev.js`,
			format: "cjs",
			sourcemap: true,
		},
	},
]);

/**
 * @param {Array<Bundle>} bundles
 * @returns {Promise<void[]>}
 */
async function bundleAll(bundles) {
	return await Promise.all([
		...bundles.map(bundle),
		writeTypeEntry(pkgName),
		writeNodeEntry(pkgName),
	]);
}

/**
 * @param {Bundle} bundle
 * @returns {Promise<void>}
 */
async function bundle({ env, outputOptions }) {
	let input = "src/index.ts";
	let start = Date.now();
	let files = [outputOptions].map((t) => relativeId(t.file));

	stdout(
		chalk.cyan(
			`Bundling ${chalk.bold(input)} → ${chalk.bold(files.join(", "))}...`
		)
	);

	let bundle = await rollup.rollup(getInputOptions(input, env));
	await bundle.write(outputOptions);
	await bundle.close();

	stdout(
		chalk.green(
			`created ${chalk.bold(files.join(", "))} in ${chalk.bold(
				ms(Date.now() - start)
			)}`
		)
	);
}

/**
 * @param {string} pkgName
 * @param {string} distFileName
 * @param {string} contents
 * @returns {Promise<void>}
 */
async function writeEntryFile(distFileName, contents) {
	let dist = "dist";
	let distPath = path.resolve(__dirname, "..", dist);
	let start = Date.now();

	stdout(chalk.cyan(`Writing ${chalk.bold(`${dist}/${distFileName}`)}...`));

	await writeFile(distPath, distFileName, contents);

	stdout(
		chalk.green(
			`created ${chalk.bold(`${dist}/${distFileName}`)} in ${chalk.bold(
				`${ms(Date.now() - start)}`
			)}`
		)
	);
}

/**
 * @param {string} pkgName
 * @returns {Promise<void>}
 */
async function writeNodeEntry(pkgName) {
	let distFileName = `${pkgName}.cjs.js`;
	let contents = `"use strict";
if (process.env.NODE_ENV === "production") {
  module.exports = require("./${pkgName}.cjs.prod.js");
} else {
  module.exports = require("./${pkgName}.cjs.dev.js");
}\n`;

	return await writeEntryFile(distFileName, contents);
}

/**
 * @param {string} pkgName
 * @returns {Promise<void>}
 */
async function writeTypeEntry(pkgName) {
	let distFileName = `${pkgName}.d.ts`;
	const contents = `export * from "./declarations/index";\n`;
	return await writeEntryFile(distFileName, contents);
}

/**
 * @param {string} id
 * @returns {string}
 */
function relativeId(id) {
	if (!isAbsolute(id)) {
		return id;
	}
	return path.relative(path.resolve(), id);
}

/**
 * @param {string} input
 * @param {Env} env
 * @returns {rollup.RollupOptions}
 */
function getInputOptions(input, env) {
	return {
		input,
		external: ["ky-universal", "node-fetch"],
		plugins: [
			nodeResolve({
				extensions: NODE_RESOLVE_EXTENSIONS,
			}),
			env &&
				replace({
					"process.env.NODE_ENV": JSON.stringify(env),
					preventAssignment: true,
				}),
			babel({
				...require("../babel.config"),
				extensions: BABEL_EXTENSIONS,
			}),
		].filter(Boolean),
	};
}

/**
 * @param {string} path
 * @returns {boolean}
 */
function isAbsolute(path) {
	const absolutePath = /^(?:\/|(?:[A-Za-z]:)?[\\|/])/;
	return absolutePath.test(path);
}

/**
 * @param {fs.PathLike} pathname
 * @param {fs.Mode | fs.MakeDirectoryOptions} [options]
 * @returns {globalThis.Promise<void>}
 */
async function mkdir(pathname, options) {
	if (!fs.existsSync(pathname)) {
		return await fs.mkdir(pathname, options);
	}
	return;
}

/**
 * @param {string} dirPath
 * @param {string} fileName
 * @param {*} contents
 * @param {string | fs.WriteFileOptions} [options]
 * @returns {Promise<void>}
 */
async function writeFile(dirPath, fileName, contents, options) {
	await mkdir(dirPath);
	return await fs.writeFile(path.join(dirPath, fileName), contents, options);
}

/**
 * @typedef {"development" | "production"} Env
 */

/**
 * @typedef {{
 *   env?: Env;
 *   outputOptions: rollup.OutputOptions
 * }} Bundle
 */
