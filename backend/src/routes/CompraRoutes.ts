import { Router } from 'express'
import { compraController } from '../controllers/compraController'

const router = Router()

router.post('/', compraController.save)
router.get('/', compraController.show)

export default router