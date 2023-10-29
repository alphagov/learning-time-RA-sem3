import { Router } from 'express'
import { helloWorldGetController } from '../../components/helloWorld/get/helloWorldGetController'
import { helloWorldPostController } from '../../components/helloWorld/post/helloWorldPostController'
import { helloWorldValidationMiddleware } from '../../middleware/helloWorldValidationMiddleware'

const helloWorldRouter = Router()

helloWorldRouter.get('/helloWorld', helloWorldGetController)
helloWorldRouter.post(
  '/helloWorld',
  helloWorldValidationMiddleware,
  helloWorldPostController
)

export default helloWorldRouter
