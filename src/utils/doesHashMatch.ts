import { getEnv } from './getEnv'
import { hashValue } from './hashValue'

export const doesHashMatch = (
  value: string,
  salt: string,
  hashedValue: string
): boolean => {
  const valueToCheck = hashValue(value, salt, getEnv('HASH_SECRET'))
  return valueToCheck === hashedValue
}
