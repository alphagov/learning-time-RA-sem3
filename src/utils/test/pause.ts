export const pause = async (timeToPauseMs: number) =>
  new Promise((resolve) => setTimeout(resolve, timeToPauseMs))
