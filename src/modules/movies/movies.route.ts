import { Router } from "express"

import { MovieController } from "./movies.controller"
import { MoviesValidatorCreate } from "./validator/create-movies.validator"
import { authMiddleware } from "../../middlewares/auth.middleware"
import { MoviesValidatorList } from "./validator/list-movies.validator"
import { LocalStorageStrategy } from "../../storage/LocalStorageStrategy"
import { StorageManager } from "../../storage/StorageManger"
import { MoviesValidatorImport } from "./validator/import-movies.validator"

const router = Router()

const localStrategy = new LocalStorageStrategy('movies')
const storageManager = new StorageManager(localStrategy)
const upload = storageManager.getMulterStorage()


router.post('/', [authMiddleware,  ...MoviesValidatorCreate.validateMws], MovieController.create)
router.delete('/:id', authMiddleware, MovieController.delete)
router.get('/:id', authMiddleware, MovieController.show)
router.get('/', [authMiddleware, ...MoviesValidatorList.validate], MovieController.list)
router.post(
  '/import',
  [authMiddleware, upload.single('movies'), ...MoviesValidatorImport.validate],
  MovieController.import
)

export default router