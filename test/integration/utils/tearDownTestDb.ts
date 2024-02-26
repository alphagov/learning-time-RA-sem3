import { dockerComposeDown } from '../../../scripts/dockerComposeDown'
import { pause } from '../../../src/utils/test/pause'

export const tearDownTestDb = async () => {
  dockerComposeDown()
  pause(500)
}

module.exports = async () => {
  await tearDownTestDb()
}
