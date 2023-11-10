import { EnvironmentVariable } from './types/EnvironmentVariable'

export const getEnv = (name: EnvironmentVariable) => {
  const env = process.env[name]

  if (!env) throw Error(`Missing environment variable: ${name}`)

  return env
}
