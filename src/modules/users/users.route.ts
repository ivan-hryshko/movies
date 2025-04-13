import { Router } from "express"
import { MovieController } from "./users.controller"
import { UsersValidator } from "./users.validator"

const router = Router()

router.post('/', UsersValidator.createMiddleware, MovieController.create)

export default router