module.exports = {
	exclude: /node_modules/,
	presets: [
		[
			"@babel/preset-env",
			{
				bugfixes: true,
				targets: { node: "current" },
			},
		],
		"@babel/preset-typescript",
	],
};
