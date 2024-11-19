import Produto from "../models/Produto";

export const produtoController = {
    save: async (req, res) => {
        try {
            const { produto_nome, produto_preco, produto_quantidade } = req.body

            if (!produto_nome || !produto_preco || !produto_quantidade
            ) {
            return res.status(400).json({ 
                error: 'Todos os campos são obrigatórios.' 
            });
            }

            const produto = await Produto.create({
                produto_nome,
                produto_preco,
                produto_quantidade
            })

            if(!produto){
                return res.status(400).json({ error: 'Erro ao criar produto' })
            }

            return res.status(200).json(produto)

        } catch (error) {
            console.error('Erro ao criar produto:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    show: async (req, res) => {
        try {
            const produtos = await Produto.findAll()
    
            if(!produtos){
                return res.status(400).json({ error: 'Erro ao buscar produtos' })
            }

            return res.status(200).json(produtos)
        } catch (error) {
            console.error('Erro ao buscar usuario:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    showByID: async (req, res) => {
        try {
            const { id } = req.params
            const produto = await Produto.findByPk(+id)
    
            if(!produto){
                return res.status(400).json({ error: 'Erro ao buscar produto' })
            }

            return res.status(200).json(produto)
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    update: async (req, res) => {
        try {
            const { produto_nome, produto_preco, produto_quantidade } = req.body
            const { id } = req.params

            if (!produto_nome || !produto_preco || !produto_quantidade
            ) {
            return res.status(400).json({ 
                error: 'Todos os campos são obrigatórios.' 
            });
            }

            const atualiza = await Produto.update({
                produto_nome,
                produto_preco,
                produto_quantidade
            }, {
                where: {produto_id: +id}
            })

            if(!atualiza){
                return res.status(400).json({ error: 'Erro ao buscar produto' })
            }

            const atualizada = await Produto.findByPk(+id)

            return res.status(200).json(atualizada)

        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleted = await Produto.destroy({
                where: {produto_id: id}
            })

            if(!deleted){
                return res.status(400).json({ error: 'Erro ao deletar produto' })
            }

            return res.status(200).json(deleted)
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
}