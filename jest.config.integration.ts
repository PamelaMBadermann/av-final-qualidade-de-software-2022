import config from "./jest.config";

let config2: any = {
    ...config,
    testMatch: ["**/*.test.ts"],
};

export default config2;
