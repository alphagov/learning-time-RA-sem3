import { Request } from 'express'
import { createMockResponseObject } from '../../../utils/test/createMockResponseObject'
import { loginPostController } from './loginPostController'
import { dbClient } from '../../../services/db/dbClient'
import { doesHashMatch } from '../../../utils/doesHashMatch'
import { when } from 'jest-when'

jest.mock('../../../services/db/dbClient', () => ({
  dbClient: {
    query: jest.fn()
  }
}))

jest.mock('../../../utils/doesHashMatch', () => ({
  doesHashMatch: jest.fn()
}))

describe('login controller tests', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns a 200 when the dbClient finds a user user and the provided the ', async () => {
    const mockResponse = createMockResponseObject(['status', 'render'])
    when(dbClient.query).mockResolvedValue([
      [
        {
          email: 'Ryan',
          hashed_password: 'aHashedPassword',
          salt: 'someSalt'
        }
      ],
      []
    ])
    when(doesHashMatch).mockReturnValue(true)
    await loginPostController(
      {
        body: {
          username: 'Ryan',
          password: 'superSecretPassword123'
        }
      } as Request,
      mockResponse
    )

    expect(dbClient.query).toHaveBeenCalledWith(
      'SELECT email, hashed_password, salt FROM USERS WHERE email = :email',
      {
        replacements: {
          email: 'Ryan'
        }
      }
    )
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.render).toHaveBeenCalledWith('login/post/index.njk', {
      username: 'Ryan'
    })
  })

  it('returns a 401 when the dbClient cannot find the user based on the provided username and renders register page', async () => {
    const mockResponse = createMockResponseObject(['status', 'render'])
    when(dbClient.query).mockResolvedValue([[], []])
    await loginPostController(
      {
        body: {
          username: 'Ryan',
          password: 'superSecretPassword123'
        }
      } as Request,
      mockResponse
    )
    expect(mockResponse.status).toHaveBeenCalledWith(401)
    expect(mockResponse.render).toHaveBeenCalledWith(
      'login/error/notRegistered.njk'
    )
  })

  it('returns a 401 when the password is incorrect', async () => {
    const mockResponse = createMockResponseObject(['status', 'render'])
    when(dbClient.query).mockResolvedValue([
      [
        {
          email: 'Ryan',
          hashed_password: 'aHashedPassword',
          salt: 'someSalt'
        }
      ],
      []
    ])
    when(doesHashMatch).mockReturnValue(false)
    await loginPostController(
      {
        body: {
          username: 'Ryan',
          password: 'superSecretPassword123'
        }
      } as Request,
      mockResponse
    )
    expect(mockResponse.status).toHaveBeenCalledWith(401)
    expect(mockResponse.render).toHaveBeenCalledWith(
      'login/error/incorrectPassword.njk'
    )
  })
})
