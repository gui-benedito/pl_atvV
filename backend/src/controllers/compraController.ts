import { Compra } from "../models/Compra"

export const compraController= {
    save: async (req, res) => {
        const { produto_id, servico_id, cliente_id, quantidade, pet_id, valor } = req.body
        const newCompra = {
            produto_id: produto_id ? produto_id : null,
            servico_id: servico_id ? servico_id : null, 
            cliente_id: cliente_id ? cliente_id : null, 
            pet_id: pet_id ? pet_id : null,
            quantidade: quantidade ? quantidade : null, 
            valor: valor
        }
        const compra = await Compra.create(newCompra)

        if(!compra){
            return res.status(400).json({erro: 'Erro ao registrar compra'})
        }

        return res.status(200).json(newCompra)
    }
}