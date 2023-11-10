import { Sequelize } from 'sequelize'
import { getEnv } from '../../utils/getEnv'

export const dbClient = new Sequelize(
  getEnv('POSTGRES_DB'),
  getEnv('POSTGRES_USER'),
  getEnv('POSTGRES_PASSWORD'),
  {
    host: getEnv('POSTGRES_HOST'),
    port: Number(getEnv('POSTGRES_PORT')),
    dialect: 'postgres'
  }
)
