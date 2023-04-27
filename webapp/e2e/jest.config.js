const config =  {
    testMatch: ["**/steps/*.js"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper:{"^uuid$": "uuid"},
    preset: "jest-puppeteer",
    transformIgnorePatterns: [
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$",
        "node_modules/(?!@toolz/allow-react)/",
    ],
    testTimeout: 30000,
    env: "jsdom"
};

module.exports = config;
