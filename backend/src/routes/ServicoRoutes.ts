import { Router } from 'express'
import { servicoController } from '../controllers/servicoController'

const router = Router()

router.get('/', servicoController.show)
router.get('/:id', servicoController.showByID)
router.post('/', servicoController.save)
router.put('/:id', servicoController.update)
router.delete('/:id', servicoController.delete)

export default router