import { Router } from 'express'
import { registroController } from '../controllers/registroController'

const router = Router()

router.get('/topCinco', registroController.getTopCinco)

export default router