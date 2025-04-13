import { Router } from "express"
import moviesRoutes from "../modules/movies/movies.route"
import usersRoutes from "../modules/users/users.route"
const routes = Router()

routes.use('/movies', moviesRoutes)
routes.use('/users', usersRoutes)

export default routes
