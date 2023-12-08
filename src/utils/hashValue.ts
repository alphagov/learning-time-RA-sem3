import { createHmac } from 'crypto'

export const hashValue = (
  valueToHash: string,
  salt: string,
  hashSecret: string
): string =>
  createHmac('sha256', hashSecret)
    .update(valueToHash + salt)
    .digest('hex')
