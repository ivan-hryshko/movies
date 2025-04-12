import { Router } from "express"
import movieRoutes from "./movies.route"

const routes = Router()

routes.use('/movies', movieRoutes)

export default routes
