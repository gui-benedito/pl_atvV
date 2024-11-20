import { Router } from 'express'
import PetRoutes from './PetRoutes'
import ClienteRoutes from './ClienteRoutes'
import ProdutoRoutes from './ProdutoRoutes'
import ServicoRoutes from './ServicoRoutes'
import CompraRoutes from './CompraRoutes'

const router = Router()

router.use('/pet', PetRoutes)
router.use('/cliente', ClienteRoutes)
router.use('/produto', ProdutoRoutes)
router.use('/servico', ServicoRoutes)
router.use('/compra', CompraRoutes)

export default router