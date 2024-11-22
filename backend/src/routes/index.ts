import { Router } from 'express'
import PetRoutes from './PetRoutes'
import ClienteRoutes from './ClienteRoutes'
import ProdutoRoutes from './ProdutoRoutes'
import ServicoRoutes from './ServicoRoutes'
import CompraRoutes from './CompraRoutes'
import RegistroRoutes from './RegistroRoutes'

const router = Router()

router.use('/pet', PetRoutes)
router.use('/cliente', ClienteRoutes)
router.use('/produto', ProdutoRoutes)
router.use('/servico', ServicoRoutes)
router.use('/compra', CompraRoutes)
router.use('/registros', RegistroRoutes)

export default router