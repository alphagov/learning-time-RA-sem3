import { dbClient } from './dbClient'

export const isDbActive = async (): Promise<boolean> => {
  try {
    await dbClient.authenticate()
    console.info('Connection has been established successfully.')
    return true
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    return false
  }
}
