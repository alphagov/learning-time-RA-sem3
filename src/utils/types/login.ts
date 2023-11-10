export interface LoginRequestBody {
  username: string
  password: string
}

export const isLoginRequestBody = (arg: unknown): arg is LoginRequestBody => {
  const test = arg as LoginRequestBody
  const testKeys = Object.keys(test)
  return (
    typeof test.username === 'string' &&
    typeof test.password === 'string' &&
    testKeys.length === 2 &&
    testKeys.every((key) => ['username', 'password'].includes(key))
  )
}
