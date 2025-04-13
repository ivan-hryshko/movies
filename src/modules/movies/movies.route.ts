import { Router } from "express"
import { MovieController } from "./movies.controller"
import { MoviesValidatorCreate } from "./validator/create-movies.validator"

const router = Router()

router.post('/', MoviesValidatorCreate.validate, MovieController.create)
router.delete('/:id', MovieController.delete)

export default router