import { isDbActiveMiddleware } from '../db/isDbActiveMiddleware'
import { isDbActive } from '../../services/db/isDbActive'
import { when } from 'jest-when'
import { createMockResponseObject } from '../../utils/test/createMockResponseObject'
import { Request } from 'express'

jest.mock('../../services/db/isDbActive', () => ({
  isDbActive: jest.fn()
}))

describe('isDbActiveMiddleware tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls next function if db is active', async () => {
    when(isDbActive).mockResolvedValue(true)
    const mockedResponse = createMockResponseObject(['status', 'render'])
    const mockedNextFunction = jest.fn()
    await isDbActiveMiddleware(
      {} as Request,
      mockedResponse,
      mockedNextFunction
    )
    expect(mockedNextFunction).toHaveBeenCalled()
  })
  it('renders internal server error if db is not active', async () => {
    when(isDbActive).mockResolvedValue(false)
    const mockedResponse = createMockResponseObject(['status', 'render'])
    const mockedNextFunction = jest.fn()
    await isDbActiveMiddleware(
      {} as Request,
      mockedResponse,
      mockedNextFunction
    )
    expect(mockedNextFunction).not.toHaveBeenCalled()
    expect(mockedResponse.status).toHaveBeenCalledWith(500)
    expect(mockedResponse.render).toHaveBeenCalledWith(
      '../views/error/internalServerError.njk'
    )
  })
})
