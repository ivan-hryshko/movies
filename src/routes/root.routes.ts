
import { Router } from "express"
import rootRoutes from '../modules/root/root.route'

const routes = Router()

routes.use('/', rootRoutes)

export default routes
