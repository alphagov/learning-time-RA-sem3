import { Request } from 'express'
import { createMockResponseObject } from '../../../utils/test/createMockResponseObject'
import { helloWorldGetController } from './helloWorldGetController'

describe('HelloWorldController tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('returns a 200 and calls the render function with the correct path', () => {
    const mockResponse = createMockResponseObject(['status', 'render'])
    helloWorldGetController({} as Request, mockResponse)
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.render).toHaveBeenCalledWith('helloWorld/get/index.njk')
  })
})
