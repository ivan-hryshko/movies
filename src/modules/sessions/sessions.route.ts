import { Router } from "express"
import { SessionsController } from "./sessions.controller"
import { SessionsValidator } from "./sessions.validator"

const router = Router()

router.post('/', SessionsValidator.createMiddleware, SessionsController.create)

export default router