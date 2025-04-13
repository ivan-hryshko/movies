import { Router } from "express"
import { UsersController } from "./users.controller"
import { UsersValidator } from "./validator/users.validator"

const router = Router()

router.post('/', UsersValidator.createMiddleware, UsersController.create)

export default router