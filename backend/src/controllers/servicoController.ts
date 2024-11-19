import Servico from "../models/Servico";

export const servicoController = {
    save: async (req, res) => {
        try {
            const { servico_nome, servico_preco } = req.body

            if (!servico_nome || !servico_preco
            ) {
            return res.status(400).json({ 
                error: 'Todos os campos são obrigatórios.' 
            });
            }

            const servico = await Servico.create({
                servico_nome,
                servico_preco,
            })

            if(!servico){
                return res.status(400).json({ error: 'Erro ao criar servico' })
            }

            return res.status(200).json(servico)

        } catch (error) {
            console.error('Erro ao criar servico:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    show: async (req, res) => {
        try {
            const servicos = await Servico.findAll()
    
            if(!servicos){
                return res.status(400).json({ error: 'Erro ao buscar servicos' })
            }

            return res.status(200).json(servicos)
        } catch (error) {
            console.error('Erro ao buscar usuario:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    showByID: async (req, res) => {
        try {
            const { id } = req.params
            const servico = await Servico.findByPk(+id)
    
            if(!servico){
                return res.status(400).json({ error: 'Erro ao buscar servico' })
            }

            return res.status(200).json(servico)
        } catch (error) {
            console.error('Erro ao buscar servico:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    update: async (req, res) => {
        try {
            const { servico_nome, servico_preco,  } = req.body
            const { id } = req.params

            if (!servico_nome || !servico_preco
            ) {
            return res.status(400).json({ 
                error: 'Todos os campos são obrigatórios.' 
            });
            }

            const atualiza = await Servico.update({
                servico_nome,
                servico_preco,
                
            }, {
                where: {servico_id: +id}
            })

            if(!atualiza){
                return res.status(400).json({ error: 'Erro ao buscar servico' })
            }

            const atualizada = await Servico.findByPk(+id)

            return res.status(200).json(atualizada)

        } catch (error) {
            console.error('Erro ao buscar servico:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleted = await Servico.destroy({
                where: {servico_id: id}
            })

            if(!deleted){
                return res.status(400).json({ error: 'Erro ao deletar servico' })
            }

            return res.status(200).json(deleted)
        } catch (error) {
            console.error('Erro ao buscar servico:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
}