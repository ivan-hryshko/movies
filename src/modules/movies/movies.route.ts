import { Router } from "express"
import { MovieController } from "./movies.controller"
import { MoviesValidator } from "./movies.validator"

const router = Router()

router.post('/create', MoviesValidator.createMovieValidators, MovieController.createMovie)

export default router