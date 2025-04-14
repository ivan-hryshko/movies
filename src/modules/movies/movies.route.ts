import { Router } from "express"
import { MovieController } from "./movies.controller"
import { MoviesValidatorCreate } from "./validator/create-movies.validator"
import { authMiddleware } from "../../middlewares/auth.middleware"

const router = Router()

router.post('/', authMiddleware,  MoviesValidatorCreate.validate, MovieController.create)
router.delete('/:id', authMiddleware, MovieController.delete)
router.get('/:id', authMiddleware, MovieController.show)
router.get('/', authMiddleware, MovieController.list)

export default router