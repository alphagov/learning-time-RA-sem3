import { exec } from 'child_process'

export const dockerComposeUp = (isTestEnv = false) =>
  exec(
    isTestEnv
      ? 'docker compose --env-file ./test/integration/utils/test.env up'
      : 'docker compose up',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.error(`stderr: ${stderr}`)
    }
  )
