import { Router } from "express"

import { RootController } from "./root.controller"

const router = Router()

router.get('/', RootController.welcome)
router.get('/movies/import', RootController.moviesImport)

export default router