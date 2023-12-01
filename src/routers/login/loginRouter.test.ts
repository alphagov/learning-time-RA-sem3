import request from 'supertest'
import app from './../../app'
import { loginRequestValidationMiddleware } from '../../middleware/login/loginRequestValidationMiddleware'
import { NextFunction, Request, Response } from 'express'
import {
  setupTestUserInDb,
  tearDownTestDb
} from '../../utils/test/setupTestUserInDb'
import { TEST_PASSWORD, TEST_USERNAME } from '../../utils/test/constants'
import { randomUUID } from 'crypto'

jest.mock('../../middleware/login/loginRequestValidationMiddleware', () => ({
  loginRequestValidationMiddleware: jest.fn(
    (_req: Request, _res: Response, next: NextFunction) => next()
  )
}))

describe('helloWorld Endpoint tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(async () => {
    await setupTestUserInDb()
  })

  afterAll(async () => {
    await tearDownTestDb()
  })

  describe('GET endpoint tests', () => {
    it('returns a 200 and renders the GET endpoint template', async () => {
      const res = await request(app).get('/login')
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
        .post('/login')
        .send({ username: TEST_USERNAME, password: TEST_PASSWORD })
      expect(res.statusCode).toEqual(200)
      expect(res.header).toHaveProperty(
        'content-type',
        'text/html; charset=utf-8'
      )
      expect(loginRequestValidationMiddleware).toHaveBeenCalled()
    })

    it('returns a 401 for no user in the db', async () => {
      const res = await request(app)
        .post('/login')
        .send({ username: randomUUID(), password: randomUUID() })
      expect(res.statusCode).toEqual(401)
      expect(res.header).toHaveProperty(
        'content-type',
        'text/html; charset=utf-8'
      )
      expect(loginRequestValidationMiddleware).toHaveBeenCalled()
    })

    it('returns a 401 for an incorrect password', async () => {
      const res = await request(app)
        .post('/login')
        .send({ username: TEST_USERNAME, password: randomUUID() })
      expect(res.statusCode).toEqual(401)
      expect(res.header).toHaveProperty(
        'content-type',
        'text/html; charset=utf-8'
      )
      expect(loginRequestValidationMiddleware).toHaveBeenCalled()
    })
  })
})
