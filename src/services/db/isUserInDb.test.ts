import { when } from 'jest-when'
import { dbClient } from './dbClient'
import { isUserInDb } from './isUserInDb'
import { TEST_USERNAME } from '../../utils/test/constants'

jest.mock('./dbClient', () => ({
  dbClient: {
    query: jest.fn()
  }
}))

describe('isUserInDb tests', () => {
  it('returns true if user is in DB', async () => {
    when(dbClient.query).mockResolvedValue([
      [
        {
          email: TEST_USERNAME
        }
      ],
      []
    ])

    expect(await isUserInDb(TEST_USERNAME)).toBe(true)
  })
  it('returns false if user is not in DB', async () => {
    when(dbClient.query).mockResolvedValue([[], []])

    expect(await isUserInDb(TEST_USERNAME)).toBe(false)
  })
})
