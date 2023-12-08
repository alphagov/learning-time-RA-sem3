import { dbClient } from './dbClient'

export const insertUserIntoDb = async (
  username: string,
  hashedPassword: string,
  salt: string,
  userId: string
): Promise<void> => {
  await dbClient.query(
    'INSERT INTO USERS(user_id, email, hashed_password, salt ) VALUES(:user_id, :email, :hashed_password, :salt)',
    {
      replacements: {
        user_id: userId,
        email: username,
        hashed_password: hashedPassword,
        salt: salt
      }
    }
  )
}
