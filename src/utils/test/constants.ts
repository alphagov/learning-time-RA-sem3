import { getEnv } from '../getEnv'
import { hashValue } from '../hashValue'

export const TEST_USERNAME = 'TEST_USER_123'
export const TEST_PASSWORD = 'TEST_PASSWORD_123'
export const TEST_USER_ID = '1234TEST'
export const TEST_RANDOM_UUID = 'a9d0a46f-7a66-435d-817c-191decee5681'
export const TEST_USER_PASSWORD_SALT = 'TEST_SALT'
export const TEST_PASSWORD_HASH = hashValue(
  TEST_PASSWORD,
  TEST_USER_PASSWORD_SALT,
  getEnv('HASH_SECRET')
)
