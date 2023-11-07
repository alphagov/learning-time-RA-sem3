import { NextFunction, Request, Response } from 'express'
import { isHelloWorldRequestBody } from '../utils/types/helloWorld'

export const helloWorldValidationMiddleware = (
  request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  if (!isHelloWorldRequestBody(request.body)) {
    response.status(400).render('helloWorld/error/invalidRequest.njk')
  } else nextFunction()
}
