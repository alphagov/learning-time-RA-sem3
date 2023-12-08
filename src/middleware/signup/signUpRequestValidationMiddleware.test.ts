import { Request, NextFunction } from 'express'
import { signUpRequestValidationMiddleware } from './signUpRequestValidationMiddleware'
import { createMockResponseObject } from '../../utils/test/createMockResponseObject'

describe(' signUpValidation Middleware tests', () => {
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

    signUpRequestValidationMiddleware(
      badRequest,
      mockedResponse,
      (() => {}) as NextFunction
    )

    expect(mockedResponse.status).toHaveBeenCalledWith(400)
    expect(mockedResponse.render).toHaveBeenCalledWith(
      'signup/error/invalidRequest.njk',
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
        usernameConfirmation: 'ryan',
        password: 'abcd',
        passwordConfirmation: 'abcd'
      }
    } as Request

    signUpRequestValidationMiddleware(
      validRequest,
      mockedResponse,
      nextFunction
    )
    expect(nextFunction).toHaveBeenCalled()
  })
})
