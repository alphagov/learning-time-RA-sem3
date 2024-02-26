import { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/*'],
  testMatch: ['<rootDir>/**/*.spec.ts'],
  setupFiles: ['<rootDir>/utils/testEnvironmentVariables.ts'],
  globalTeardown: '<rootDir>/utils/tearDownTestDb.ts',
  globalSetup: '<rootDir>/utils/setupTestDb.ts'
}

export default config
