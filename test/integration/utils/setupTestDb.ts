import { pause } from '../../../src/utils/test/pause'
import { setupTestUserInDb } from './setupTestUserInDb'
import { setupTestEnvVars } from './testEnvironmentVariables'

export const setupTestDb = async () => {
  setupTestEnvVars()
  setupTestUserInDb()
}
module.exports = async () => {
  await setupTestDb()
  await pause(4000)
}
