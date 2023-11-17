import { createHmac } from 'crypto'
import { getEnv } from './getEnv'

export const doesHashMatch = (
  value: string,
  salt: string,
  hashedValue: string
): boolean => {
  const valueToCheck = createHmac('sha256', getEnv('HASH_SECRET'))
    .update(value + salt)
    .digest('hex')
  console.log(value + salt)
  console.log(hashedValue)
  return valueToCheck === hashedValue
}
