import { Request, Response } from 'express'

export const loginGetController = (_request: Request, response: Response) => {
  response.status(200).render('login/get/index.njk')
}
