import { Request, NextFunction } from 'express'
import { helloWorldValidationMiddleware } from './helloWorldValidationMiddleware'
import { createMockResponseObject } from '../utils/test/createMockResponseObject'

describe(' helloWorldValidation Middleware tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it.each([{}, { name: 'aaaa', badProp: 'aaa' }, { badProp: 'aaaa' }])(
    'returns a 400 for invalid Requests',
    async (input) => {
      const mockedResponse = createMockResponseObject(['status', 'render'])

      const badRequest = {
        body: input
      } as Request

      helloWorldValidationMiddleware(
        badRequest,
        mockedResponse,
        (() => {}) as NextFunction
      )

      expect(mockedResponse.status).toHaveBeenCalledWith(400)
      expect(mockedResponse.render).toHaveBeenCalledWith(
        'helloWorld/error/invalidRequest.njk'
      )
    }
  )

  it('It calls next if the request body is valid', () => {
    const nextFunction: NextFunction = jest.fn()
    const mockedResponse = createMockResponseObject(['status', 'send'])
    const validRequest = {
      body: {
        name: 'Ryan'
      }
    } as Request

    helloWorldValidationMiddleware(validRequest, mockedResponse, nextFunction)
    expect(nextFunction).toHaveBeenCalled()
  })
})
