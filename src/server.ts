import app from './app'
import { PORT } from './config/config'

app
  .listen(PORT, () => {
    console.info(`Server listening on port ${PORT}, http://localhost:${PORT}/`)
  })
  .on('error', (error: Error) => {
    console.error(`Unable to start server because of ${error.message}`)
  })
