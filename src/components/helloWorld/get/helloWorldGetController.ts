import { Request, Response } from 'express'

export const helloWorldGetController = (
  _request: Request,
  response: Response
) => {
  response.status(200).render('helloWorld/get/index.njk')
}
