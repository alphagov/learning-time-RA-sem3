import { Sequelize } from 'sequelize'
import { getEnv } from '../../../src/utils/getEnv'

export const testDbClient = new Sequelize(
  getEnv('POSTGRES_DB'),
  getEnv('POSTGRES_USER'),
  getEnv('POSTGRES_PASSWORD'),
  {
    host: getEnv('POSTGRES_HOST'),
    port: Number(getEnv('POSTGRES_PORT')),
    dialect: 'postgres'
  }
)

export const isTestDbActive = async (): Promise<boolean> => {
  try {
    await testDbClient.authenticate()
    console.info('Connection has been established successfully.')
    return true
  } catch (error) {
    console.info('Database is not running')
    return false
  }
}
