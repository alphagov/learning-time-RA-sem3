import { dockerComposeUp } from '../../../scripts/dockerComposeUp'
import { dockerComposeDown } from '../../../scripts/dockerComposeDown'
import {
  TEST_PASSWORD_HASH,
  TEST_USERNAME,
  TEST_USER_ID,
  TEST_USER_PASSWORD_SALT
} from '../utils/constants'
import { pause } from '../../../src/utils/test/pause'
import { createTestUserTable } from './createTestUserTable'
import { isTestDbActive, testDbClient } from './testDbClient'

const isTestEnv = true
export const setupTestUserInDb = async () => {
  if (!(await isTestDbActive())) {
    dockerComposeUp(isTestEnv)
    await pause(3000) //2s is the smallest amount of time for db to start up
    await setupTestData()
    await pause(2000)
  } else {
    dockerComposeDown()
    await pause(2000)
    await setupTestUserInDb()
  }
}

const setupTestData = async () => {
  try {
    await createTestUserTable()
    await testDbClient.query(
      `INSERT INTO USERS(user_id, email, hashed_password, salt ) VALUES(:user_id, :email, :hashed_password, :salt)`,
      {
        replacements: {
          user_id: TEST_USER_ID,
          email: TEST_USERNAME,
          hashed_password: TEST_PASSWORD_HASH,
          salt: TEST_USER_PASSWORD_SALT
        }
      }
    )
  } catch (err) {
    console.info('aaaa error', err)
  }
}
