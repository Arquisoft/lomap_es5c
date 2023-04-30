module.exports = {
	testEnvironment: "node",
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	testMatch: ["**/steps/*.ts"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	moduleNameMapper: { "^uuid$": "uuid" },
	preset: "jest-puppeteer",
	testTimeout: 100000,
};
