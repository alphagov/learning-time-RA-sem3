import { exec } from 'child_process'

const dockerComposeUp = () =>
  exec('docker compose up', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.error(`stderr: ${stderr}`)
  })

dockerComposeUp().stdout?.pipe(process.stdout)
