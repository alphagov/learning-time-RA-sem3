import { Request, Response } from 'express'
import { dbClient } from '../../../services/db/dbClient'
import { doesHashMatch } from '../../../utils/doesHashMatch'
import { UserRegisteredResponse } from '../../../utils/types/UserRegisteredResponse'
import { createUserTable } from '../../../services/db/createUserTable'

export const loginPostController = async (
  request: Request,
  response: Response
) => {
  const { username, password } = request.body

  try {
    await createUserTable()
    const userDbEntry = (
      await dbClient.query(
        'SELECT email, hashed_password, salt FROM USERS WHERE email = :email',
        {
          replacements: {
            email: username
          }
        }
      )
    )[0][0] as UserRegisteredResponse

    if (!userDbEntry) {
      response.status(401).render('login/error/notRegistered.njk')
      return
    } else if (
      !doesHashMatch(
        password,
        userDbEntry.salt.trim(),
        userDbEntry.hashed_password.trim()
      ) //oddly returning a lot of whitespace in the values so trimming
    ) {
      response.status(401).render('login/error/incorrectPassword.njk')
      return
    }

    response.status(200).render('login/post/index.njk', {
      username
    })
    return
  } catch (error) {
    console.error('Database query failed error:', error)
    response.status(501).render('error/internalServerError.njk', {
      username
    })
  }
}
