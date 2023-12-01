import { exec } from 'child_process'

export const dockerComposeDown = () =>
  exec('docker compose down', (error, stdout) => {
    if (error) {
      console.error(`exec error: ${error}`)
    } else console.log(`stopping container stdout: ${stdout}`)
  })
