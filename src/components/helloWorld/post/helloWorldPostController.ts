import { Request, Response } from 'express'

export const helloWorldPostController = (
  request: Request,
  response: Response
) => {
  const { name } = request.body
  response.status(200).render('helloWorld/post/index.njk', {
    name
  })
}
