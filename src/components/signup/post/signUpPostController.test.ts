import { Request } from 'express'
import { createMockResponseObject } from '../../../utils/test/createMockResponseObject'
import { signUpPostController } from './signUpPostController'
import { when } from 'jest-when'
import { randomUUID } from 'crypto'
import {
  TEST_PASSWORD,
  TEST_PASSWORD_HASH,
  TEST_RANDOM_UUID,
  TEST_USERNAME
} from '../../../utils/test/constants'
import { createUserTable } from '../../../services/db/createUserTable'
import { insertUserIntoDb } from '../../../services/db/insertUserIntoDb'
import { isUserInDb } from '../../../services/db/isUserInDb'
import { hashValue } from '../../../utils/hashValue'

jest.mock('../../../services/db/dbClient', () => ({
  dbClient: {
    query: jest.fn()
  }
}))

jest.mock('../../../services/db/createUserTable', () => ({
  createUserTable: jest.fn()
}))

jest.mock('../../../services/db/isUserInDb', () => ({
  isUserInDb: jest.fn()
}))

jest.mock('../../../services/db/insertUserIntoDb', () => ({
  insertUserIntoDb: jest.fn()
}))

jest.mock('../../../utils/hashValue', () => ({
  hashValue: jest.fn()
}))

jest.mock('crypto', () => ({
  randomUUID: jest.fn()
}))

describe('sign up controller tests', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.spyOn(console, 'error')
  })

  it('returns a 200 when the username does not already exist in the db and successfully writes new user to db', async () => {
    const mockResponse = createMockResponseObject(['status', 'render'])
    when(randomUUID).mockReturnValue(TEST_RANDOM_UUID)
    when(hashValue).mockReturnValue(TEST_PASSWORD_HASH)
    when(isUserInDb).mockResolvedValue(false)
    when(insertUserIntoDb).mockResolvedValue(void 0)
    await signUpPostController(
      {
        body: {
          username: TEST_USERNAME,
          usernameConfirmation: TEST_USERNAME,
          password: TEST_PASSWORD,
          passwordConfirmation: TEST_PASSWORD
        }
      } as Request,
      mockResponse
    )

    expect(createUserTable).toHaveBeenCalled()
    expect(isUserInDb).toHaveBeenCalledWith(TEST_USERNAME)
    expect(insertUserIntoDb).toHaveBeenCalledWith(
      TEST_USERNAME,
      TEST_PASSWORD_HASH,
      TEST_RANDOM_UUID,
      TEST_RANDOM_UUID
    )
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.render).toHaveBeenCalledWith('signup/post/index.njk', {
      username: TEST_USERNAME
    })
  })

  it('returns a 400 when the username is already signed up', async () => {
    const mockResponse = createMockResponseObject(['status', 'render'])
    when(randomUUID).mockReturnValue(TEST_RANDOM_UUID)
    when(hashValue).mockReturnValue(TEST_PASSWORD_HASH)
    when(isUserInDb).mockResolvedValue(true)
    when(insertUserIntoDb).mockResolvedValue(void 0)
    await signUpPostController(
      {
        body: {
          username: TEST_USERNAME,
          usernameConfirmation: TEST_USERNAME,
          password: TEST_PASSWORD,
          passwordConfirmation: TEST_PASSWORD
        }
      } as Request,
      mockResponse
    )

    expect(createUserTable).toHaveBeenCalled()
    expect(isUserInDb).toHaveBeenCalledWith(TEST_USERNAME)
    expect(insertUserIntoDb).not.toHaveBeenCalled()
    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.render).toHaveBeenCalledWith(
      'signUp/error/alreadyRegistered.njk',
      {
        username: TEST_USERNAME
      }
    )
  })

  it('returns a 501 for a failure to lookup a user', async () => {
    const mockResponse = createMockResponseObject(['status', 'render'])
    when(randomUUID).mockReturnValue(TEST_RANDOM_UUID)
    when(hashValue).mockReturnValue(TEST_PASSWORD_HASH)
    when(isUserInDb).mockRejectedValue('dbError')
    when(insertUserIntoDb).mockResolvedValue(void 0)
    await signUpPostController(
      {
        body: {
          username: TEST_USERNAME,
          usernameConfirmation: TEST_USERNAME,
          password: TEST_PASSWORD,
          passwordConfirmation: TEST_PASSWORD
        }
      } as Request,
      mockResponse
    )

    expect(createUserTable).toHaveBeenCalled()
    expect(isUserInDb).toHaveBeenCalledWith(TEST_USERNAME)
    expect(insertUserIntoDb).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(
      'Database insertion failed error:',
      'dbError'
    )
    expect(mockResponse.status).toHaveBeenCalledWith(501)
    expect(mockResponse.render).toHaveBeenCalledWith(
      'signup/error/internalServerError.njk',
      {
        username: TEST_USERNAME
      }
    )
  })
})
