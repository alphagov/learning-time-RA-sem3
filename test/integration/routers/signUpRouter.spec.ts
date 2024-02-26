import request from 'supertest'
import app from '../../../src/app'
import { NextFunction, Request, Response } from 'express'
import { TEST_USERNAME } from '../../../src/utils/test/constants'
import { signUpRequestValidationMiddleware } from '../../../src/middleware/signup/signUpRequestValidationMiddleware'

jest.mock(
  '../../../src/middleware/signup/signUpRequestValidationMiddleware',
  () => ({
    signUpRequestValidationMiddleware: jest.fn(
      (_req: Request, _res: Response, next: NextFunction) => next()
    )
  })
)

describe('helloWorld Endpoint tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET endpoint tests', () => {
    it('returns a 200 and renders the GET endpoint template', async () => {
      const res = await request(app).get('/signup')
      expect(res.statusCode).toEqual(200)
      expect(res.header).toHaveProperty(
        'content-type',
        'text/html; charset=utf-8'
      )
    })
  })

  describe('POST endpoint tests', () => {
    it('calls the validation middleware, and returns the POST endpoint template for a valid request', async () => {
      const res = await request(app)
        .post('/signup')
        .send({
          username: TEST_USERNAME + 'new',
          usernameConfirmation: TEST_USERNAME + 'new',
          password: 'abcd',
          passwordConfirmation: 'abcd'
        })
      expect(res.statusCode).toEqual(200)
      expect(res.header).toHaveProperty(
        'content-type',
        'text/html; charset=utf-8'
      )
      expect(signUpRequestValidationMiddleware).toHaveBeenCalled()
    })

    it('returns a 400 for user already in the db', async () => {
      const res = await request(app).post('/signup').send({
        username: TEST_USERNAME,
        usernameConfirmation: TEST_USERNAME,
        password: 'abcd',
        passwordConfirmation: 'abcd'
      })
      expect(res.statusCode).toEqual(400)
      expect(res.header).toHaveProperty(
        'content-type',
        'text/html; charset=utf-8'
      )
      expect(signUpRequestValidationMiddleware).toHaveBeenCalled()
    })
  })
})
