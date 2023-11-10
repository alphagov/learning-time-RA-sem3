import { Router } from 'express'
import { loginGetController } from '../../components/login/get/loginGetController'
import { loginRequestValidationMiddleware } from '../../middleware/login/loginRequestValidationMiddleware'
import { loginPostController } from '../../components/login/post/loginPostController'

const loginRouter = Router()

loginRouter.get('/login', loginGetController)
loginRouter.post(
  '/login',
  loginRequestValidationMiddleware,
  loginPostController
)

export default loginRouter
