import { Response } from 'express'

type WritableResponseKeys = Exclude<
  keyof Response,
  | 'closed'
  | 'connection'
  | 'errored'
  | 'socket'
  | 'writable'
  | 'writableCorked'
  | 'writableEnded'
  | 'writableFinished'
  | 'writableHighWaterMark'
  | 'writableLength'
  | 'writableNeedDrain'
  | 'writableObjectMode'
>
//this excludes readonly keys

export const createMockResponseObject = (
  keys: WritableResponseKeys[]
): Response => {
  const mockedResponseObject = {} as Record<WritableResponseKeys, unknown>
  keys.forEach((key) => {
    mockedResponseObject[key] = jest.fn(() => mockedResponseObject)
  })
  return mockedResponseObject as Response
}
