import { Router } from 'express'
import PetRoutes from './PetRoutes'
import ClienteRoutes from './ClienteRoutes'
import ProdutoRoutes from './ProdutoRoutes'
import ServicoRoutes from './ServicoRoutes'

const router = Router()

router.use('/pet', PetRoutes)
router.use('/cliente', ClienteRoutes)
router.use('/produto', ProdutoRoutes)
router.use('/servico', ServicoRoutes)

export default router