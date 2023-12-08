import { NextFunction, Request, Response } from 'express'
import { isDbActive } from '../../services/db/isDbActive'

export const isDbActiveMiddleware = async (
  _request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  if (!(await isDbActive())) {
    response.status(500).render('../views/error/internalServerError.njk')
  } else nextFunction()
}
