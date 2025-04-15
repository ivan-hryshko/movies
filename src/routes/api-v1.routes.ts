import { Router } from "express"
import moviesRoutes from "../modules/movies/movies.route"
import usersRoutes from "../modules/users/users.route"
import sessionsRoutes from "../modules/sessions/sessions.route"

const routes = Router()

routes.use('/movies', moviesRoutes)
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)

export default routes
