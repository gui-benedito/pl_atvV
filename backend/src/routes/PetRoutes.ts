import { Router } from 'express'
import { petController } from '../controllers/petController'

const router = Router()

router.get('/', petController.show)
router.get('/:id', petController.showByID)
router.post('/', petController.save)
router.put('/:id', petController.update)
router.delete('/:id', petController.delete)

export default router