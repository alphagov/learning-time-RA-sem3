import { Router } from 'express'
import { signupGetController } from '../../components/signup/get/signupGetController'
import { signUpRequestValidationMiddleware } from '../../middleware/signup/signUpRequestValidationMiddleware'
import { signUpPostController } from '../../components/signup/post/signUpPostController'

const signUpRouter = Router()

signUpRouter.get('/signup', signupGetController)
signUpRouter.post(
  '/signup',
  signUpRequestValidationMiddleware,
  signUpPostController
)

export default signUpRouter
