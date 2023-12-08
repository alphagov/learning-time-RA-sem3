import { stdout } from 'process'
import { dockerComposeDown } from './dockerComposeDown'

dockerComposeDown().stdout?.pipe(stdout)
