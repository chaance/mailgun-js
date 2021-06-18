const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const ms = require("ms");

const stderr = console.error.bind(console);

/**
 * @param {string} pkgName
 */
async function writeNodeEntry(pkgName) {
	const start = Date.now();
	let dist = "dist";
	let distPath = path.resolve(__dirname, "..", dist);
	let distFileName = `${pkgName}.cjs.js`;

	stderr(chalk.cyan(`\nWriting ${chalk.bold(`${dist}/${distFileName}`)}...`));

	const contents = `"use strict";
if (process.env.NODE_ENV === "production") {
  module.exports = require("./${pkgName}.cjs.prod.js");
} else {
  module.exports = require("./${pkgName}.cjs.dev.js");
}
`;
	if (!fs.existsSync(distPath)) {
		await fs.mkdir(distPath);
	}
	await fs.writeFile(path.join(distPath, distFileName), contents);

	stderr(
		chalk.green(
			`created ${chalk.bold(`dist/${pkgName}.cjs.js`)} in ${chalk.bold(
				`${ms(Date.now() - start)}`
			)}`
		)
	);
}

module.exports = writeNodeEntry;
