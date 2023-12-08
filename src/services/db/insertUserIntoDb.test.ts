import { insertUserIntoDb } from './insertUserIntoDb'
import { dbClient } from './dbClient'
import {
  TEST_USERNAME,
  TEST_PASSWORD_HASH,
  TEST_USER_PASSWORD_SALT,
  TEST_RANDOM_UUID
} from '../../utils/test/constants'

jest.mock('./dbClient', () => ({
  dbClient: {
    query: jest.fn()
  }
}))

describe('insertUserIntoDb tests', () => {
  it('queries the db client with the expected command and params', async () => {
    await insertUserIntoDb(
      TEST_USERNAME,
      TEST_PASSWORD_HASH,
      TEST_USER_PASSWORD_SALT,
      TEST_RANDOM_UUID
    )
    expect(dbClient.query).toHaveBeenCalledWith(
      'INSERT INTO USERS(user_id, email, hashed_password, salt ) VALUES(:user_id, :email, :hashed_password, :salt)',
      {
        replacements: {
          user_id: TEST_RANDOM_UUID,
          email: TEST_USERNAME,
          hashed_password: TEST_PASSWORD_HASH,
          salt: TEST_USER_PASSWORD_SALT
        }
      }
    )
  })
})
