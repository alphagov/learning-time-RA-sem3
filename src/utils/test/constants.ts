import { createHmac } from 'crypto'
import { getEnv } from '../getEnv'

export const TEST_USERNAME = 'TEST_USER_123'
export const TEST_PASSWORD = 'TEST_PASSWORD_123'
export const TEST_USER_ID = '1234TEST'
export const TEST_USER_PASSWORD_SALT = 'TEST_SALT'
export const TEST_PASSWORD_HASH = createHmac('sha256', getEnv('HASH_SECRET'))
  .update(TEST_PASSWORD + TEST_USER_PASSWORD_SALT)
  .digest('hex')
