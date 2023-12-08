import { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/*'],
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  setupFiles: ['<rootDir>src/utils/test/testEnvironmentVariables.ts']
}

export default config
