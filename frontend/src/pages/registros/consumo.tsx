import { useEffect, useState } from "react";
import ConsumoCard from "./consumoCard";
import '../css/style.css';
import Pet from "../../modelo/pet";
import { clienteService } from "../../services/clienteService";
import { produtoService } from "../../services/produtoService";

type Compra = {
    compra_id: number;
    produto_id: number | null;
    servico_id: number | null;
    cliente_id: number;
    pet_id: number | null;
    quantidade: number;
    valor: number;
    produto: {
        produto_id: number;
        produto_nome: string;
        produto_preco: number;
    } | null;
    servico: {
        servico_id: number;
        servico_nome: string;
        servico_preco: number;
    } | null;
}

type Cliente = {
    cliente_id: number;
    cliente_nome: string;
    cliente_nomeSocial: string;
    cliente_cpf: string;
    emissao_cpf: string;
    cliente_rg: string;
    emissao_rg: string;
    cliente_telefone: string;
    cliente_email: string;
    pets: Pet[];
    compras: Compra[];
};

type Produto = {
    produto_id: number;
    produto_nome: string;
    produto_preco: number;
}

export default function Consumo() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([])

    const fetchClientes = async () => {
        try {
            const clientes = await clienteService.getAllClientes()
            setClientes(clientes)
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            // Pode adicionar lógica de notificação de erro aqui
        }
    }

    const fetchProdutos = async () => {
        try {
            const storedProdutos = await produtoService.getAllProduto()
            setProdutos(storedProdutos);
        } catch (error) {
            console.error("Erro ao pegar produtos:", error);
        }
    }

    useEffect(() => {
        fetchClientes()
        fetchProdutos()
    }, []);

    return (
        <div className="consumo-container">
            <div className="Card-container">
                {clientes.length <= 0 ? (
                    <div>
                        <h3>Sem consumos</h3>
                    </div>
                ) : (
                    clientes.map((cliente) => (
                        <ConsumoCard
                            key={cliente.cliente_id}
                            id={cliente.cliente_id}
                            nome={cliente.cliente_nome}
                            compras={cliente.compras} // Passa o array de compras corretamente
                        />
                    ))
                )}
            </div>
        </div>
    );
}
