import { Router } from "express"
import { MovieController } from "../controllers/movies.controller"

const router = Router()

router.post('/create', MovieController.createMovie)

export default router