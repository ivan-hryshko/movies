import { Router } from "express"
import { MovieController } from "./movies.controller"

const router = Router()

router.post('/create', MovieController.createMovie)

export default router