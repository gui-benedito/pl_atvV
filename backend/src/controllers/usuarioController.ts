import { Pet } from "../models/Pet";
import { Usuario } from "../models/Usuario"

export const usuarioController = {
    save: async (req, res) => {
        try {
            const { usuario_nome, usuario_nomeSocial, usuario_cpf, emissao_cpf, usuario_rg, emissao_rg, usuario_telefone, usuario_email } = req.body

            if (!usuario_nome || !usuario_nomeSocial || !usuario_cpf || !usuario_rg || !usuario_telefone || !usuario_email
            ) {
            return res.status(400).json({ 
                error: 'Todos os campos são obrigatórios.' 
            });
            }

            const usuario = await Usuario.create({
                usuario_nome, 
                usuario_nomeSocial, 
                usuario_cpf, 
                emissao_cpf, 
                usuario_rg, 
                emissao_rg, 
                usuario_telefone, 
                usuario_email
            })

            if(!usuario){
                return res.status(400).json({ error: 'Erro ao criar usuário' })
            }

            return res.status(200).json(usuario)
        } catch (error) {
            console.error('Erro ao criar usuario:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    show: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll({
                include: Pet
            })
    
            if(!usuarios){
                return res.status(400).json({ error: 'Erro ao buscar usuários' })
            }

            return res.status(200).json(usuarios)
        } catch (error) {
            console.error('Erro ao buscar usuario:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    showByID: async (req, res) => {
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(+id)
    
            if(!usuario){
                return res.status(400).json({ error: 'Erro ao buscar usuário' })
            }

            return res.status(200).json(usuario)
        } catch (error) {
            console.error('Erro ao buscar usuario:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    update: async (req, res) => {
        try {
            const { usuario_nome, usuario_nomeSocial, usuario_cpf, emissao_cpf, usuario_rg, emissao_rg, usuario_telefone, usuario_email } = req.body
            const { id } = req.params

            if (!usuario_nome || !usuario_nomeSocial || !usuario_cpf || !usuario_rg || !usuario_telefone || !usuario_email
            ) {
            return res.status(400).json({ 
                error: 'Todos os campos são obrigatórios.' 
            });
            }

            const atualiza = await Usuario.update({
                usuario_nome, 
                usuario_nomeSocial, 
                usuario_cpf, 
                emissao_cpf, 
                usuario_rg, 
                emissao_rg, 
                usuario_telefone, 
                usuario_email
            }, {
                where: {usuario_id: +id}
            })

            if(!atualiza){
                return res.status(400).json({ error: 'Erro ao buscar usuários' })
            }

            const atualizada = await Usuario.findByPk(+id)

            return res.status(200).json(atualizada)

        } catch (error) {
            console.error('Erro ao buscar usuario:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleted = await Usuario.destroy({
                where: {usuario_id: id}
            })

            if(!deleted){
                return res.status(400).json({ error: 'Erro ao deletar usuário' })
            }

            return res.status(200).json(deleted)
        } catch (error) {
            console.error('Erro ao buscar usuario:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}