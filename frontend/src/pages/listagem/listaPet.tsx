import { useState, useEffect } from "react";
import PetCard from "./petCard";
import imgSemCliente from "../../images/lista-vazia.jpg";
import Modal from "../../componentes/Modal";
import { petService } from "../../services/petService";

type PetType = {
    pet_nome: string;
    pet_raca: string;
    pet_tipo: string;
    pet_genero: string;
    cliente_id: number
};

export default function ListaPet() {
    const [pets, setPets] = useState<PetType[]>([]);
    const [openModalExcluir, setOpenModalExcluir] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);
    const [tutorId, setTutorId] = useState<number | null>(null);
    const [petNome, setPetNome] = useState<string>("");

    const fetchPets = async () => {
        try {
            const pets = await petService.getAllPets()
            setPets(pets)
        } catch (error) {
            console.error("Erro ao pegar pets:", error);
        }
    }

    useEffect(() => {
        fetchPets()
    }, []);

    const closeModalMensagem = () => setOpenModalMensagem(false);

    const closeModalExcluir = () => setOpenModalExcluir(false);

    const openModalConfirmaExcluir = (tutorId: number, petNome: string) => {
        setTutorId(tutorId);
        setPetNome(petNome);
        setOpenModalExcluir(true);
    };

    const confirmaExcluir = () => {
        if (tutorId !== null && petNome) {
            const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
            const cliente = clientes.find((c: any) => c.id === tutorId);
            if (cliente) {
                const petIndex = cliente.pets.findIndex((p: any) => p.nome === petNome);
                if (petIndex !== -1) {
                    cliente.pets.splice(petIndex, 1);
                    localStorage.setItem("clientes", JSON.stringify(clientes));
                    fetchPets()
                    setOpenModalExcluir(false);
                    setOpenModalMensagem(true);
                }
            }
        }
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
                        nome={p.pet_nome}
                        genero={p.pet_genero}
                        tipo={p.pet_tipo}
                        raca={p.pet_raca}
                        tutorId={p.cliente_id}
                        onExcluir={() => openModalConfirmaExcluir(p.cliente_id, p.pet_nome)} tutorNome={""}                    />
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
