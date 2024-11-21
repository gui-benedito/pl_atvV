import { Pet } from "../models/Pet";
import { Cliente } from "../models/Cliente"
import { Compra } from "../models/Compra";

export const clienteController = {
    save: async (req, res) => {
        try {
            const { cliente_nome, cliente_nomeSocial, cliente_cpf, emissao_cpf, cliente_rg, emissao_rg, cliente_telefone, cliente_email } = req.body

            if (!cliente_nome || !cliente_nomeSocial || !cliente_cpf || !cliente_rg || !cliente_telefone || !cliente_email
            ) {
            return res.status(400).json({ 
                error: 'Todos os campos são obrigatórios.' 
            });
            }

            const cliente = await Cliente.create({
                cliente_nome, 
                cliente_nomeSocial, 
                cliente_cpf, 
                emissao_cpf, 
                cliente_rg, 
                emissao_rg, 
                cliente_telefone, 
                cliente_email
            })

            if(!cliente){
                return res.status(400).json({ error: 'Erro ao criar usuário' })
            }

            return res.status(200).json(cliente)
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    show: async (req, res) => {
        try {
            const clientes = await Cliente.findAll({
                include: [Pet, Compra]
            })
    
            if(!clientes){
                return res.status(400).json({ error: 'Erro ao buscar usuários' })
            }

            return res.status(200).json(clientes)
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    showByID: async (req, res) => {
        try {
            const { id } = req.params
            const cliente = await Cliente.findByPk(+id, {
                include: [Pet, Compra]
            })
    
            if(!cliente){
                return res.status(400).json({ error: 'Erro ao buscar usuário' })
            }

            return res.status(200).json(cliente)
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    update: async (req, res) => {
        try {
            const { cliente_nome, cliente_nomeSocial, cliente_cpf, emissao_cpf, cliente_rg, emissao_rg, cliente_telefone, cliente_email } = req.body
            const { id } = req.params

            if (!cliente_nome || !cliente_nomeSocial || !cliente_cpf || !cliente_rg || !cliente_telefone || !cliente_email
            ) {
            return res.status(400).json({ 
                error: 'Todos os campos são obrigatórios.' 
            });
            }

            const atualiza = await Cliente.update({
                cliente_nome, 
                cliente_nomeSocial, 
                cliente_cpf, 
                emissao_cpf, 
                cliente_rg, 
                emissao_rg, 
                cliente_telefone, 
                cliente_email
            }, {
                where: {cliente_id: +id}
            })

            if(!atualiza){
                return res.status(400).json({ error: 'Erro ao buscar usuários' })
            }

            const atualizada = await Cliente.findByPk(+id)

            return res.status(200).json(atualizada)

        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleted = await Cliente.destroy({
                where: {cliente_id: id}
            })

            if(!deleted){
                return res.status(400).json({ error: 'Erro ao deletar usuário' })
            }

            return res.status(200).json(deleted)
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}