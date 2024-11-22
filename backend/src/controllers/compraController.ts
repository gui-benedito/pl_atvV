import { where } from "sequelize"
import { Compra } from "../models/Compra"
import Produto from "../models/Produto"
import Servico from "../models/Servico"
import { Cliente } from "../models/Cliente"

export const compraController= {
    save: async (req, res) => {
        const { produto_id, servico_id, cliente_id, quantidade, pet_id, valor } = req.body

        const produto = await Produto.findByPk(produto_id)
        const servico = await Servico.findByPk(servico_id)

        let valorTotal = produto_id ? servico_id ? ((quantidade * produto.produto_preco) + (servico.servico_preco)) : quantidade * produto.produto_preco : servico_id ? servico.servico_preco: 0 

        const newCompra = {
            produto_id: produto_id ? produto_id : null,
            servico_id: servico_id ? servico_id : null, 
            cliente_id: cliente_id ? cliente_id : null, 
            pet_id: pet_id ? pet_id : null,
            quantidade: quantidade ? quantidade : null, 
            valor: valorTotal
        }
        const compra = await Compra.create(newCompra)

        if(!compra){
            return res.status(400).json({erro: 'Erro ao registrar compra'})
        }

        if(produto_id){
            await Produto.update({
                produto_quantidade: produto.produto_quantidade - quantidade
            }, {where: {produto_id: produto_id}})
        }

        return res.status(200).json(newCompra)
    },

    show: async (req, res) => {
        const compras = await Compra.findAll({
            include: [
                {
                    model: Produto,
                    attributes: ['produto_id', 'produto_nome', 'produto_preco'],
                },
                {
                    model: Servico,
                    attributes: ['servico_id', 'servico_nome', 'servico_preco'],
                },
            ],
        })
        
        if(!compras){
            res.status(400).json({error: 'Erro ao encontrar compras'})
        }
        res.status(200).json(compras)
    }
}