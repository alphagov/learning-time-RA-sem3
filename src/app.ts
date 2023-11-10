import cookieParser from 'cookie-parser'
import express from 'express'
import helloWorldRouter from './routers/helloWorld/helloWorldRouter'
import { APP_VIEWS } from './config/config'
import nunjucks from 'nunjucks'
import rootRouter from './routers/root/rootRouter'
import loginRouter from './routers/login/loginRouter'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
nunjucks.configure(APP_VIEWS, {
  autoescape: true,
  express: app
})

app.use(helloWorldRouter)
app.use(rootRouter)
app.use(loginRouter)

export default app
