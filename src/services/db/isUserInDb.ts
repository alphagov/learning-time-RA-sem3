import { dbClient } from './dbClient'

export const isUserInDb = async (username: string): Promise<boolean> => {
  const userDbEntry = (
    (await dbClient.query('SELECT email FROM USERS WHERE email = :email', {
      replacements: {
        email: username
      }
    })) as [
      [
        {
          email: string
        }
      ],
      []
    ]
  )[0][0]
  return !!userDbEntry
}
