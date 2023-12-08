import { NextFunction, Request, Response } from 'express'
import { isSignUpRequestBody } from '../../utils/types/signUp'

export const signUpRequestValidationMiddleware = (
  request: Request,
  response: Response,
  nextFunction: NextFunction
): void => {
  if (!isSignUpRequestBody(request.body)) {
    response.status(400).render('signup/error/invalidRequest.njk', {
      errorMessage: 'Invalid sign up details provided'
    })
  } else nextFunction()
}
