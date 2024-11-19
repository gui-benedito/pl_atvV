import { Pet } from "../models/Pet"
import { Usuario } from "../models/Usuario";

export const petController = {
    save: async (req, res) => {
        try {
            const { pet_nome, pet_tipo, pet_raca, pet_genero, usuario_id } = req.body

            if ( !pet_nome || !pet_tipo || !pet_raca || !pet_genero || !usuario_id
            ) {
            return res.status(400).json({ 
                error: 'Todos os campos são obrigatórios.' 
            });
            }

            const pet = await Pet.create({
                pet_nome,
                pet_tipo,
                pet_raca,
                pet_genero,
                usuario_id: +usuario_id
            })

            if(!pet){
                return res.status(400).json({ error: 'Erro ao criar pet' })
            }

            return res.status(200).json(pet)
        } catch (error) {
            console.error('Erro ao criar pet:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    show: async (req, res) => {
        try {
            const usuarios = await Pet.findAll({
                include: Usuario
            })
    
            if(!usuarios){
                return res.status(400).json({ error: 'Erro ao buscar pets' })
            }

            return res.status(200).json(usuarios)
        } catch (error) {
            console.error('Erro ao buscar pets:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    showByID: async (req, res) => {
        try {
            const { id } = req.params
            const pet = await Pet.findByPk(+id)
    
            if(!pet){
                return res.status(400).json({ error: 'Erro ao buscar pet' })
            }

            return res.status(200).json(pet)
        } catch (error) {
            console.error('Erro ao buscar pet:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    update: async (req, res) => {
        try {
            const { pet_nome, pet_tipo, pet_raca, pet_genero, usuario_id } = req.body
            const { id } = req.params

            if (!pet_nome || !pet_tipo || !pet_raca || !pet_genero || !usuario_id
            ) {
            return res.status(400).json({ 
                error: 'Todos os campos são obrigatórios.' 
            });
            }

            const atualiza = await Pet.update({
                pet_nome,
                pet_tipo,
                pet_raca,
                pet_genero,
                usuario_id
            }, {
                where: {pet_id: +id}
            })

            if(!atualiza){
                return res.status(400).json({ error: 'Erro ao atualizar pet' })
            }

            const atualizada = await Pet.findByPk(+id)

            return res.status(200).json(atualizada)

        } catch (error) {
            console.error('Erro ao buscar usuario:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleted = await Pet.destroy({
                where: {pet_id: id}
            })

            if(!deleted){
                return res.status(400).json({ error: 'Erro ao deletar pet' })
            }

            return res.status(200).json(deleted)
        } catch (error) {
            console.error('Erro ao buscar pet:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}