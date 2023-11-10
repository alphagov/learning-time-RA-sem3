import { Request } from 'express'
import { createMockResponseObject } from '../../../utils/test/createMockResponseObject'
import { loginPostController } from './loginPostController'

describe('HelloWorldController tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns a 200 and calls the render function with the correct path and the name from the body of the request', () => {
    const mockResponse = createMockResponseObject(['status', 'render'])
    loginPostController(
      {
        body: {
          username: 'Ryan',
          password: 'superSecretPassword123'
        }
      } as Request,
      mockResponse
    )
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.render).toHaveBeenCalledWith('login/post/index.njk', {
      username: 'Ryan'
    })
  })
})
