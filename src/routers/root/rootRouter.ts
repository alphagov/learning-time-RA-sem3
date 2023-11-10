import { Router } from 'express'
import { rootGetController } from '../../components/root/get/rootGetController'

const rootRouter = Router()

rootRouter.get('/', rootGetController)

export default rootRouter
