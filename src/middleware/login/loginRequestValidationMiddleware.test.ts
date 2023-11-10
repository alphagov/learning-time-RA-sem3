import { Request, NextFunction } from 'express'
import { loginRequestValidationMiddleware } from './loginRequestValidationMiddleware'
import { createMockResponseObject } from '../../utils/test/createMockResponseObject'

describe(' helloWorldValidation Middleware tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it.each([
    {},
    { username: 'aaaa', badProp: 'aaa' },
    { password: 'aaaaa', badProp: 'aaaa' },
    { username: 'aaaa', password: 'aaaaa', badProp: 'aaaa' },
    { username: 'aaaa' },
    { password: 'aaaa' }
  ])('returns a 400 for invalid Requests', async (input) => {
    const mockedResponse = createMockResponseObject(['status', 'render'])

    const badRequest = {
      body: input
    } as Request

    loginRequestValidationMiddleware(
      badRequest,
      mockedResponse,
      (() => {}) as NextFunction
    )

    expect(mockedResponse.status).toHaveBeenCalledWith(400)
    expect(mockedResponse.render).toHaveBeenCalledWith(
      'login/error/invalidRequest.njk',
      {
        errorMessage: 'Invalid sign up details provided'
      }
    )
  })

  it('It calls next if the request body is valid', () => {
    const nextFunction: NextFunction = jest.fn()
    const mockedResponse = createMockResponseObject(['status', 'send'])
    const validRequest = {
      body: {
        username: 'ryan',
        password: 'superSecretPassword123'
      }
    } as Request

    loginRequestValidationMiddleware(validRequest, mockedResponse, nextFunction)
    expect(nextFunction).toHaveBeenCalled()
  })
})
