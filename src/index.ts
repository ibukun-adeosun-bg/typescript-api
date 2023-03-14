import 'dotenv/config'
import 'module-alias/register'
import App from './app'
import validateEnv from '@/utils/validateEnv'
import PostController from './controllers/post.controller'
validateEnv()

const app = new App([new PostController()], Number(process.env.PORT));
app.listen()