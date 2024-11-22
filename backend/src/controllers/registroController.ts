import { Cliente } from "../models/Cliente";
import { Compra } from "../models/Compra";
import Produto from "../models/Produto";
import Servico from "../models/Servico";

export const registroController = {
    getTopCinco: async (req, res) => {
        try {
            const clientes = await Cliente.findAll({
                include: [
                    {
                        model: Compra,
                        include: [
                            {
                                model: Produto,
                                attributes: ['produto_nome', 'produto_preco'],
                            },
                            {
                                model: Servico,
                                attributes: ['servico_nome', 'servico_preco'],
                            },
                        ],
                    }
                ],
            })
    
            if(!clientes){
                return res.status(400).json({ error: 'Erro ao buscar usuários' })
            }

            const lista: { [key: string]: number } = {};


            clientes.forEach((cliente) => {
                if (!lista[cliente.cliente_nome]) {
                    lista[cliente.cliente_nome] = 0;
                }
                lista[cliente.cliente_nome] += cliente.compras.reduce((acc, c) => acc + c.valor, 0)
            });
    
            const listaOrdenada = Object.entries(lista)
                .filter(([nome, qtd]) => qtd > 0)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([nome, valor]) => ({ nome, valor }));

            return res.status(200).json(listaOrdenada)
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    getMaisConsumiram: async (req, res) => {
        
    }
}