import config from "./jest.config";

let config2: any = {
    ...config,
    testMatch: ["**/*.spec.ts"],
};

export default config2;
