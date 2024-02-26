export const setupTestEnvVars = () => {
  process.env.POSTGRES_PORT = '5432'
  process.env.POSTGRES_USER = 'TEST_PG_USER'
  process.env.POSTGRES_PASSWORD = 'TEST_PG_PASSWORD'
  process.env.POSTGRES_DB = 'TEST_PG_DB_NAME'
  process.env.POSTGRES_HOST = 'localhost'
  process.env.env = 'TEST'
  process.env.HASH_SECRET = 'TEST_HASH_SECRET'
}
