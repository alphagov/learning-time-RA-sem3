import { Request, Response } from 'express'
import { createUserTable } from '../../../services/db/createUserTable'
import { randomUUID } from 'crypto'
import { hashValue } from '../../../utils/hashValue'
import { getEnv } from '../../../utils/getEnv'
import { isUserInDb } from '../../../services/db/isUserInDb'
import { insertUserIntoDb } from '../../../services/db/insertUserIntoDb'

export const signUpPostController = async (
  request: Request,
  response: Response
) => {
  const { username, password } = request.body
  try {
    await createUserTable()
    const userPresentInDb = await isUserInDb(username)
    if (userPresentInDb) {
      response.status(400).render('signUp/error/alreadyRegistered.njk', {
        username
      })
      return
    }
    const userId = randomUUID()
    const salt = randomUUID()
    const hashedPassword = hashValue(password, salt, getEnv('HASH_SECRET'))
    await insertUserIntoDb(username, hashedPassword, salt, userId)
    response.status(200).render('signup/post/index.njk', {
      username
    })
    return
  } catch (error) {
    console.error('Database insertion failed error:', error)
    response.status(501).render('signup/error/internalServerError.njk', {
      username
    })
  }
}
