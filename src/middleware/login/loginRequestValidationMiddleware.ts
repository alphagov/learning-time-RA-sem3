import { NextFunction, Request, Response } from 'express'
import { isLoginRequestBody } from '../../utils/types/login'

export const loginRequestValidationMiddleware = (
  request: Request,
  response: Response,
  nextFunction: NextFunction
): void => {
  if (!isLoginRequestBody(request.body)) {
    response.status(400).render('login/error/invalidRequest.njk', {
      errorMessage: 'Invalid sign up details provided'
    })
  } else nextFunction()
}
