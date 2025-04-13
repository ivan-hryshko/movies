import { Router } from "express"
import { MovieController } from "./movies.controller"
import { MoviesValidatorCreate } from "./validator/create-movies.validator"
import { authMiddleware } from "../../middlewares/auth.middleware"

const router = Router()

router.post('/',  MoviesValidatorCreate.validate, MovieController.create)
router.delete('/:id', MovieController.delete)
router.get('/:id', authMiddleware, MovieController.show)

export default router