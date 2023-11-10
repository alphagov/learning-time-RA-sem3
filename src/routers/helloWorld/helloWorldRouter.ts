import { Router } from 'express'
import { helloWorldGetController } from '../../components/helloWorld/get/helloWorldGetController'
import { helloWorldPostController } from '../../components/helloWorld/post/helloWorldPostController'
import { helloWorldValidationMiddleware } from '../../middleware/helloWorld/helloWorldValidationMiddleware'

const helloWorldRouter = Router()

helloWorldRouter.get('/helloworld', helloWorldGetController)
helloWorldRouter.post(
  '/helloworld',
  helloWorldValidationMiddleware,
  helloWorldPostController
)

export default helloWorldRouter
