import { Cliente } from "../models/Cliente";
import { Compra } from "../models/Compra";
import { Pet } from "../models/Pet";
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

    getTopDez: async (req, res) => {
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

            const listaProduto = {};

            const listaServico = {};

            clientes.forEach((c) => {
                if(c.compras.length > 0){
                    c.compras.forEach((co) => {
                        if(co.produto){
                            if(!listaProduto[c.cliente_nome]){
                                listaProduto[c.cliente_nome] = 0
                            }
                            listaProduto[c.cliente_nome] += co.quantidade
                        }
                        if(co.servico){
                            if(!listaServico[c.cliente_nome]){
                                listaServico[c.cliente_nome] = 0
                            }
                            listaServico[c.cliente_nome] += 1
                        }
                    })
                }
            })

            const produtoOrdenado = Object.fromEntries(
                Object.entries(listaProduto).sort((a, b) => {
                    return (b[1] as number) - (a[1] as number);
                }).slice(0, 10)
            )
            
            const servicoOrdenado = Object.fromEntries(
                Object.entries(listaServico).sort((a, b) => {
                    return (b[1] as number) - (a[1] as number);
                }).slice(0, 10)
            )

            return res.status(200).json({produtoOrdenado, servicoOrdenado})
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    consumoGeral: async (req, res) => {
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

            const listaProduto = {};

            const listaServico = {};

            clientes.forEach((c) => {
                if(c.compras.length > 0){
                    c.compras.forEach((co) => {
                        if(co.produto){
                            if(!listaProduto[co.produto.produto_nome]){
                                listaProduto[co.produto.produto_nome] = 0
                            }
                            listaProduto[co.produto.produto_nome] += co.quantidade
                        }
                        if(co.servico){
                            if(!listaServico[co.servico.servico_nome]){
                                listaServico[co.servico.servico_nome] = 0
                            }
                            listaServico[co.servico.servico_nome] += 1
                        }
                    })
                }
            })

            const produtoOrdenado = Object.fromEntries(
                Object.entries(listaProduto).sort((a, b) => {
                    return (b[1] as number) - (a[1] as number);
                })
            )
            
            const servicoOrdenado = Object.fromEntries(
                Object.entries(listaServico).sort((a, b) => {
                    return (b[1] as number) - (a[1] as number);
                })
            )

            return res.status(200).json({produtoOrdenado, servicoOrdenado})
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    consumoTipoRaca: async (req, res) => {
        try {
            const pets = await Pet.findAll({
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
                    },
                    {
                        model: Cliente,
                    },
                ]
            });
        
            const lista = [];
        
            pets.forEach((p) => {
                if (p.compras.length > 0) {
                    p.compras.forEach((co) => {
                        if (co.produto) {
                            lista.push({
                                raca: p.pet_raca,
                                tipoAnimal: p.pet_tipo, // Gato ou Cachorro
                                tipo: "produto", // Define o tipo como "produto"
                                nome: co.produto.produto_nome,
                                quantidade: co.quantidade
                            });
                        }
        
                        if (co.servico) {
                            lista.push({
                                raca: p.pet_raca,
                                tipoAnimal: p.pet_tipo, // Gato ou Cachorro
                                tipo: "servico", // Define o tipo como "serviço"
                                nome: co.servico.servico_nome,
                                quantidade: 1 // Serviços geralmente são unitários
                            });
                        }
                    });
                }
            });
        
            // Ordenar a lista com base na quantidade (opcional, se necessário)
            const listaOrdenada = lista.sort((a, b) => b.quantidade - a.quantidade);
        
            return res.status(200).json(listaOrdenada);
        } catch (error) {
            console.error('Erro ao buscar pets:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }               
}