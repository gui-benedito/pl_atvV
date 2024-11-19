import { useState, useEffect } from "react";
import ClienteCard from "./clienteCard";
import { Outlet } from "react-router-dom";
import Modal from "../../componentes/Modal";
import imgSemCliente from "../../images/lista-vazia.jpg";
import { clienteService } from '../../services/clienteService'
import '../css/style.css';
import Pet from "../../modelo/pet";

type ClienteType = {
    cliente_id: number;
    cliente_nome: string;
    cliente_nomeSocial: string;
    cliente_cpf: string
    emissao_cpf: string
    cliente_rg: string
    emissao_rg: string
    cliente_telefone: string;
    cliente_email: string;
    pets: Pet[];
};

export default function ListaCliente() {
    const [clientes, setClientes] = useState<ClienteType[]>([]);
    const [openModalExcluir, setOpenModalExcluir] = useState(false);
    const [clienteIdParaExcluir, setClienteIdParaExcluir] = useState<number | null>(null);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    const fetchClientes = async () => {
        try {
            const clientesData = await clienteService.getAllClientes();
            setClientes(clientesData);
        } catch (error) {
            console.error("Error setting clientes:", error);
        }
    }

    useEffect(() => {
        fetchClientes()
    }, []);

    const closeModalExcluir = () => setOpenModalExcluir(false);

    const openModalConfirmaExcluir = (id: number) => {
        setClienteIdParaExcluir(id);
        setOpenModalExcluir(true);
    };

    const closeModalMensagem = () => setOpenModalMensagem(false);

    const confirmaExcluir = async () => {
        if (clienteIdParaExcluir !== null) {
            try {
                await clienteService.deleteCliente(clienteIdParaExcluir);
                await fetchClientes(); 
                setOpenModalExcluir(false); 
                setClienteIdParaExcluir(null); 
                setOpenModalMensagem(true);
            } catch (error) {
                console.error("Erro ao excluir cliente:", error);
            }
        }
    };

    return (
        <>
            <div className="header">
                <h2>Lista de Clientes</h2>
                <a href="/cliente" key="lista"><button className="header-btn">Lista</button></a>
                <a href="/cliente/cadastro" key="cadastrar"><button className="header-btn">Cadastrar</button></a>
            </div>
            <div className="Card-container">
                {clientes.length <= 0 ? (
                    <div className="lista-vazia">
                        <img src={imgSemCliente} alt="Sem clientes cadastrados" />
                    </div>
                ) : (
                    clientes.map((cliente) => (
                        <ClienteCard 
                            cliente_id={cliente.cliente_id} 
                            cliente_nome={cliente.cliente_nome} 
                            cliente_nomeSocial={cliente.cliente_nomeSocial} 
                            cliente_cpf={cliente.cliente_cpf} 
                            emissao_cpf={cliente.emissao_cpf} 
                            cliente_rg={cliente.cliente_rg} 
                            emissao_rg={cliente.emissao_rg} 
                            cliente_telefone={cliente.cliente_telefone} 
                            cliente_email={cliente.cliente_email} 
                            pets={[]} 
                            onExcluir={() => openModalConfirmaExcluir(+cliente.cliente_id)}                            
                        />
                    ))
                )}
            </div>
            <Modal
                isOpen={openModalExcluir}
                label="Confirma a exclusão do cliente?"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={closeModalExcluir} className="btn btn-danger">Cancelar</button>
                        <button onClick={confirmaExcluir} className="btn btn-primary">Confirmar</button>
                    </div>
                }
            >
                <></>
            </Modal>
            <Modal
                isOpen={openModalMensagem}
                label="Cliente excluído com sucesso"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={closeModalMensagem} className="btn btn-secondary">Ok</button>
                    </div>
                }
            >
                <></>
            </Modal>
            <Outlet />
        </>
    );
}
