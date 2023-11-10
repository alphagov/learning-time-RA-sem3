import { Request, Response } from 'express'

export const loginPostController = (request: Request, response: Response) => {
  const { username } = request.body
  response.status(200).render('login/post/index.njk', {
    username
  })
}
