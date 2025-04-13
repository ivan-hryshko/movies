import { Router } from "express"
import { MovieController } from "./movies.controller"
import { MoviesValidatorCreate } from "./validator/movies.validator"

const router = Router()

router.post('/', MoviesValidatorCreate.validate, MovieController.create)
router.delete('/', MovieController.delete)

export default router