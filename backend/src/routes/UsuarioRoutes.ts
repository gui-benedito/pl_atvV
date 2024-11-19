import { Router } from 'express'
import { usuarioController } from '../controllers/usuarioController'

const router = Router()

router.get('/', usuarioController.show)
router.get('/:id', usuarioController.showByID)
router.post('/', usuarioController.save)
router.put('/:id', usuarioController.update)
router.delete('/:id', usuarioController.delete)

export default router