export interface SignUpRequestBody {
  username: string
  usernameConfirmation: string
  password: string
  passwordConfirmation: string
}

export const isSignUpRequestBody = (arg: unknown): arg is SignUpRequestBody => {
  const test = arg as SignUpRequestBody
  const testKeys = Object.keys(test)
  return (
    typeof test.username === 'string' &&
    typeof test.password === 'string' &&
    typeof test.usernameConfirmation === 'string' &&
    typeof test.passwordConfirmation === 'string' &&
    testKeys.length === 4 &&
    testKeys.every((key) =>
      [
        'username',
        'usernameConfirmation',
        'password',
        'passwordConfirmation'
      ].includes(key)
    ) &&
    test.username === test.usernameConfirmation &&
    test.password === test.passwordConfirmation
  )
}
