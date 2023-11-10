import { Request } from 'express'
import { createMockResponseObject } from '../../../utils/test/createMockResponseObject'
import { loginGetController } from './loginGetController'

describe('HelloWorldController tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('returns a 200 and calls the render function with the correct path', () => {
    const mockResponse = createMockResponseObject(['status', 'render'])
    loginGetController({} as Request, mockResponse)
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.render).toHaveBeenCalledWith('login/get/index.njk')
  })
})
