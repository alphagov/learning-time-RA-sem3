import { testDbClient } from './testDbClient'

export const createTestUserTable = async () => {
  await testDbClient.query(
    `CREATE TABLE IF NOT EXISTS USERS(
            user_id CHAR(100) PRIMARY KEY, email CHAR(100), hashed_password CHAR(100), salt CHAR(100)
        )`
  )
}
