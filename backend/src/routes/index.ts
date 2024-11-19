import { Router } from 'express'
import PetRoutes from './PetRoutes'
import UsuarioRoutes from './UsuarioRoutes'
import ProdutoRoutes from './ProdutoRoutes'
import ServicoRoutes from './ServicoRoutes'

const router = Router()

router.use('/pet', PetRoutes)
router.use('/usuario', UsuarioRoutes)
router.use('/produto', ProdutoRoutes)
router.use('/servico', ServicoRoutes)

export default router