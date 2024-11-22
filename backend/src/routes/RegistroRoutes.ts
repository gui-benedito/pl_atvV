import { Router } from 'express'
import { registroController } from '../controllers/registroController'

const router = Router()

router.get('/topCinco', registroController.getTopCinco)
router.get('/topDez', registroController.getTopDez)

export default router