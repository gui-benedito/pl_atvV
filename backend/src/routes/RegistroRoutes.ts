import { Router } from 'express'
import { registroController } from '../controllers/registroController'

const router = Router()

router.get('/topCinco', registroController.getTopCinco)
router.get('/topDez', registroController.getTopDez)
router.get('/consumoGeral', registroController.consumoGeral)
router.get('/consumoTipoRaca', registroController.consumoTipoRaca)

export default router