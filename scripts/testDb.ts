import { isDbActive } from '../src/services/db/isDbActive'

isDbActive().then((r) => console.info(`isDbActive: ${r}`))
