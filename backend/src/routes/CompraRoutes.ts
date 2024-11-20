import { Router } from 'express'
import { compraController } from '../controllers/compraController'

const router = Router()

router.post('/', compraController.save)

export default router