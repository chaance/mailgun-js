import babel from "rollup-plugin-babel";
import prettier from "rollup-plugin-prettier";
import replace from "@rollup/plugin-replace";
import tsc from "./scripts/tsc-plugin";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import pkgJson from "./package.json";

let nameParts = pkgJson.name.split("/");
let pkgName = nameParts[nameParts.length - 1];

const PRETTY = true;
const BABEL_EXTENSIONS = [".mjs", ".js", ".ts"];
const NODE_RESOLVE_EXTENSIONS = [...BABEL_EXTENSIONS, ".json", ".node"];
const EXTERNAL_MODULES = ["ky-universal", "node-fetch"];

const babelConfig = {
	...require("./babel.config"),
	extensions: BABEL_EXTENSIONS,
};

const config = [
	// Module for compilers
	{
		input: "src/index.ts",
		output: {
			file: `dist/${pkgName}.esm.js`,
			format: "esm",
			sourcemap: true,
		},
		external: EXTERNAL_MODULES,
		plugins: [
			nodeResolve({
				extensions: NODE_RESOLVE_EXTENSIONS,
			}),
			tsc(),
			babel(babelConfig),
		].concat(PRETTY ? prettier({ parser: "babel" }) : []),
	},

	// CJS
	{
		input: "src/index.ts",
		output: {
			file: `dist/${pkgName}.cjs.prod.js`,
			format: "cjs",
		},
		plugins: [
			nodeResolve({
				extensions: NODE_RESOLVE_EXTENSIONS,
			}),
			replace({
				"process.env.NODE_ENV": JSON.stringify("production"),
				preventAssignment: true,
			}),
			babel(babelConfig),
		],
	},
	{
		input: "src/index.ts",
		output: {
			file: `dist/${pkgName}.cjs.dev.js`,
			format: "cjs",
			sourcemap: true,
		},
		plugins: [
			nodeResolve({
				extensions: NODE_RESOLVE_EXTENSIONS,
			}),
			replace({
				"process.env.NODE_ENV": JSON.stringify("development"),
				preventAssignment: true,
			}),
			babel(babelConfig),
		],
	},
];

export default config;
