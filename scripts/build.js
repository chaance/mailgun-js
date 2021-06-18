// const execSync = require("child_process").execSync;
const writeNodeEntry = require("./write-node-entry");
const rollup = require("rollup");
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
const stderr = console.error.bind(console);

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

async function bundleAll(bundles) {
	for (let args of bundles) {
		await bundle(args);
	}
	await writeNodeEntry(pkgName);
}

async function bundle({ env, outputOptions }) {
	let input = "src/index.ts";
	let start = Date.now();
	let files = [outputOptions].map((t) => relativeId(t.file));

	stderr(
		chalk.cyan(`\n${chalk.bold(input)} → ${chalk.bold(files.join(", "))}...`)
	);

	let bundle = await rollup.rollup(getInputOptions(input, env));
	await bundle.write(outputOptions);
	await bundle.close();

	stderr(
		chalk.green(
			`created ${chalk.bold(files.join(", "))} in ${chalk.bold(
				ms(Date.now() - start)
			)}`
		)
	);
}

function relativeId(id) {
	if (!isAbsolute(id)) {
		return id;
	}
	return path.relative(path.resolve(), id);
}

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

function isAbsolute(path) {
	const absolutePath = /^(?:\/|(?:[A-Za-z]:)?[\\|/])/;
	return absolutePath.test(path);
}
