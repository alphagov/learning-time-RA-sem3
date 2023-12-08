import { Request, Response } from 'express'

export const signupGetController = (_request: Request, response: Response) => {
  response.status(200).render('signup/get/index.njk')
}
