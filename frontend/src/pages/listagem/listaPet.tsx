import { useState, useEffect } from "react";
import PetCard from "./petCard";
import imgSemCliente from "../../images/lista-vazia.jpg";
import Modal from "../../componentes/Modal";
import { petService } from "../../services/petService";
import { clienteService } from "../../services/clienteService";

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
};

type PetType = {
    pet_id: number
    pet_nome: string
    pet_raca: string
    pet_tipo: string
    pet_genero: string
    cliente_id: number
};

export default function ListaPet() {
    const [pets, setPets] = useState<PetType[]>([])
    const [openModalExcluir, setOpenModalExcluir] = useState(false)
    const [openModalMensagem, setOpenModalMensagem] = useState(false)
    const [petId, setPetId] = useState<number | null>(null)
    const [petNome, setPetNome] = useState<string>("")
    const [clientes, setClientes] = useState<ClienteType[]>([])

    const fetchPets = async () => {
        try {
            const pets = await petService.getAllPets()
            setPets(pets)
            const allClientes = await clienteService.getAllClientes()
            setClientes(allClientes)
        } catch (error) {
            console.error("Erro ao pegar pets:", error);
        }
    }

    useEffect(() => {
        fetchPets()
    }, []);

    const closeModalMensagem = () => setOpenModalMensagem(false);

    const closeModalExcluir = () => setOpenModalExcluir(false);

    const openModalConfirmaExcluir = (pet_id: number) => {
        setPetId(pet_id)
        setPetNome(petNome);
        setOpenModalExcluir(true);
    };

    const confirmaExcluir = async () => {
        if(petId){
            await petService.deletePet(petId)
        }
        fetchPets()
        setOpenModalExcluir(false);
        setOpenModalMensagem(true);
    };

    return (
        <>
            <div className="header">
                <h2>Lista de Pets</h2>
                <a href="/pet" key="lista"><button className="header-btn">Lista</button></a>
                <a href="/pet/cadastro" key="cadastrar"><button className="header-btn">Cadastrar</button></a>
            </div>
            {pets.length <= 0 ? (
                <div className="lista-vazia">
                    <img src={imgSemCliente} alt="Sem pets cadastrados" />
                </div>
            ) : (
                pets.map((p) => (
                    <PetCard
                        key={`${p.cliente_id}-${p.pet_nome}`}
                        pet_nome={p.pet_nome}
                        pet_genero={p.pet_genero}
                        pet_tipo={p.pet_tipo}
                        pet_raca={p.pet_raca}
                        onExcluir={() => openModalConfirmaExcluir(p.pet_id)} 
                        tutorNome={
                            clientes.find((c) => c.cliente_id === p.cliente_id)?.cliente_nomeSocial || ""
                        }
                        pet_id={p.pet_id}                    
                    />
                ))
            )}

            <Modal
                isOpen={openModalExcluir}
                label="Confirma a exclusão do pet?"
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
                label="Pet excluído com sucesso"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={closeModalMensagem} className="btn btn-secondary">Ok</button>
                    </div>
                }
            >
                <></>
            </Modal>
        </>
    );
}
