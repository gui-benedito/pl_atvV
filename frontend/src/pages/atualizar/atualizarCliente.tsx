import { useState, useEffect } from "react";
import Cliente from "../../modelo/cliente";
import CPF from "../../modelo/cpf";
import RG from "../../modelo/rg";
import Telefone from "../../modelo/telefone";
import { Navigate } from "react-router-dom";
import { clienteService } from '../../services/clienteService'
import Modal from "../../componentes/Modal";

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
    // pets: Pet[];
}

export default function AtualizarCliente() {
    const [cliente, setCliente] = useState<ClienteType | null>(null);
    const [redirectToLista, setRedirectToLista] = useState(false);
    const [openModalCadastro, setOpenModalCadastro] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    const fetchCliente = async (id: number) => {
        try {
            const clientesData = await clienteService.getClienteByID(id);
            setCliente(clientesData);
            console.log(clientesData)
        } catch (error) {
            console.error("Error setting cliente:", error);
        }
    }  

    useEffect(() => {
        const pathSegments = window.location.pathname.split("/");
        const id = Number(pathSegments[pathSegments.length - 1]); 
        if (!isNaN(id)) {
            fetchCliente(id);
        } else {
            console.error("Invalid client ID in the URL.");
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOpenModalCadastro(true);
    };

    const confirmaAtualizacao = () => {
        if (!cliente) return;
        
        const nome = (document.getElementById("inNome") as HTMLInputElement).value;
        const nomeSocial = (document.getElementById("inNomeSocial") as HTMLInputElement).value;
        const cpf = (document.getElementById("inCPF") as HTMLInputElement).value;
        const cpfData = (document.getElementById("inCPFData") as HTMLInputElement).value;
        const rg = (document.getElementById("inRG") as HTMLInputElement).value;
        const rgData = (document.getElementById("inRGData") as HTMLInputElement).value;
        // const ddd = (document.getElementById("inDDD") as HTMLInputElement).value;
        const telefone = (document.getElementById("inTelefone") as HTMLInputElement).value;
        const email = (document.getElementById("inEmail") as HTMLInputElement).value;

        const updatedCliente = {
            cliente_nome: nome,
            cliente_nomeSocial: nomeSocial,
            cliente_cpf: cpf,
            emissao_cpf: cpfData,
            cliente_rg: rg,
            emissao_rg: rgData,
            cliente_telefone: telefone,
            cliente_email: email
        }

        clienteService.updateCliente(cliente.cliente_id, updatedCliente)

        setOpenModalCadastro(false);
        setOpenModalMensagem(true);
    };

    const closeModalCadastro = () => setOpenModalCadastro(false);
    const closeModalMensagem = () => setOpenModalMensagem(false);

    const redirect = () => {
        setTimeout(() => {
            setRedirectToLista(true);
        }, 500);
    };

    if (redirectToLista) {
        return <Navigate to="/cliente" />;
    }

    if (!cliente) return null;

    return (
        <div className="container-fluid">
            <form id="form-cliente" onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Nome" id="inNome" defaultValue={cliente.cliente_nome} />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Nome social" id="inNomeSocial" defaultValue={cliente.cliente_nomeSocial} />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="CPF" id="inCPF" defaultValue={cliente.cliente_cpf} />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Data de emissão" id="inCPFData" defaultValue={cliente.emissao_cpf} />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="RG" id="inRG" defaultValue={cliente.cliente_rg} />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Data de emissão" id="inRGData" defaultValue={cliente.emissao_rg} />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Telefone" id="inTelefone" defaultValue={cliente.cliente_telefone} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">@</span>
                    <input type="text" className="form-control" placeholder="E-mail" id="inEmail" defaultValue={cliente.cliente_email} />
                </div>
                <div className="input-group mb-3">
                    <button className="btn-atualizar" type="submit">Atualizar</button>
                </div>
            </form>

            <Modal
                isOpen={openModalCadastro}
                label="Confirma a atualização do cliente?"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={closeModalCadastro} className="btn btn-danger">Cancelar</button>
                        <button onClick={confirmaAtualizacao} className="btn btn-primary">Confirmar</button>
                    </div>
                }
            >
                <></>
            </Modal>

            <Modal
                isOpen={openModalMensagem}
                label="Cliente atualizado com sucesso"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={redirect} className="btn btn-secondary">Ok</button>
                    </div>
                }
            >
                <></>
            </Modal>
        </div>
    );
}
