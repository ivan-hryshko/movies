import { Router } from "express"
import multer from "multer"

import { MovieController } from "./movies.controller"
import { MoviesValidatorCreate } from "./validator/create-movies.validator"
import { authMiddleware } from "../../middlewares/auth.middleware"
import { MoviesValidatorList } from "./validator/list-movies.validator"

const router = Router()
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '')
  },
  filename: (req, file, cb) => {
    console.log('file :>> ', file);
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null, fileName)
  }
})
const upload = multer({ storage })


router.post('/', [authMiddleware,  ...MoviesValidatorCreate.validate], MovieController.create)
router.delete('/:id', authMiddleware, MovieController.delete)
router.get('/:id', authMiddleware, MovieController.show)
router.get('/', [authMiddleware, ...MoviesValidatorList.validate], MovieController.list)
router.post('/import', [authMiddleware, upload.single('movies')], MovieController.import)

export default router