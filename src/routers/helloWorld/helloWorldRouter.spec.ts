import request from 'supertest'
import app from '../../app'
import { helloWorldValidationMiddleware } from '../../middleware/helloWorld/helloWorldValidationMiddleware'
import { NextFunction, Request, Response } from 'express'

jest.mock('../../middleware/helloWorld/helloWorldValidationMiddleware', () => ({
  helloWorldValidationMiddleware: jest.fn(
    (_req: Request, _res: Response, next: NextFunction) => next()
  )
}))

describe('helloWorld Endpoint tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET endpoint tests', () => {
    it('returns a 200 and renders the GET endpoint template', async () => {
      const res = await request(app).get('/helloWorld')
      expect(res.statusCode).toEqual(200)
      expect(res.header).toHaveProperty(
        'content-type',
        'text/html; charset=utf-8'
      )
    })
  })

  describe('POST endpoint tests', () => {
    it('calls the validation middleware, and returns the POST endpoint template for a valid request', async () => {
      const res = await request(app).post('/helloWorld').send({ name: 'ryan' })
      expect(res.statusCode).toEqual(200)
      expect(res.header).toHaveProperty(
        'content-type',
        'text/html; charset=utf-8'
      )
      expect(helloWorldValidationMiddleware).toHaveBeenCalled()
    })
  })
})
