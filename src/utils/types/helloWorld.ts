export interface HelloWorldRequestBody {
  name: string
}

export const isHelloWorldRequestBody = (
  arg: unknown
): arg is HelloWorldRequestBody => {
  const test = arg as HelloWorldRequestBody
  return (
    typeof test.name === 'string' &&
    Object.keys(test).length === 1 &&
    Object.keys(test).every((key) => key === 'name')
  )
}
