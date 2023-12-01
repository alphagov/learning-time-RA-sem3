import { stdout } from 'process'
import { dockerComposeUp } from './dockerComposeUp'

dockerComposeUp().stdout?.pipe(stdout)
