/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 15000,
};

export default config;
