import { HelloWorld } from './index'

describe('dummy test', () => {
  it('it returns helloWorld', () => {
    expect(HelloWorld()).toStrictEqual('HelloWorld')
  })
})
