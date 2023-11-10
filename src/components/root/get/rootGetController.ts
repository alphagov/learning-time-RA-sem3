import { Request, Response } from 'express'

export const rootGetController = (_request: Request, response: Response) => {
  response.status(200).render('root/get/index.njk')
}
