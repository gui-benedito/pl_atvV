import { Router } from 'express'
import { clienteController } from '../controllers/clienteController'

const router = Router()

router.get('/', clienteController.show)
router.get('/:id', clienteController.showByID)
router.post('/', clienteController.save)
router.put('/:id', clienteController.update)
router.delete('/:id', clienteController.delete)

export default router