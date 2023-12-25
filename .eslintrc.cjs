require("@ariesclark/eslint-config/eslint-patch");
process.env["ESLINT_PROJECT_ROOT"] = __dirname;

module.exports = {
	extends: ["@ariesclark/eslint-config", "@ariesclark/eslint-config/react"],
	root: true,
	settings: {
		react: {
			version: "18"
		}
	},

	ignorePatterns: ["vite.config.ts"]
};
