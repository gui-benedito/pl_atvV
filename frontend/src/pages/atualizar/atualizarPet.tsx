import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Modal from "../../componentes/Modal";
import { Navigate } from "react-router-dom";
import { petService } from "../../services/petService";

type PetType = {
    pet_id: number
    pet_nome: string
    pet_raca: string
    pet_tipo: string
    pet_genero: string
    cliente_id: number
};

export default function AtualizarPet() {
    const [pet, setPet] = useState<PetType | null>(null);
    const [redirectToLista, setRedirectToLista] = useState(false);
    const [openModalCadastro, setOpenModalCadastro] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    const fetchPet = async (id: number) => {
        try {
            const foundPet = await petService.getPetByID(id)
            setPet(foundPet)
        } catch (error) {
            console.error("Error setting pet:", error);
        }
    }

    useEffect(() => {
        const pathSegments = window.location.pathname.split('/');
        const id = Number(pathSegments[pathSegments.length - 1]);
        fetchPet(id)
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOpenModalCadastro(true);
    };

    const confirmaAtualizacao = async () => {
        const nome = (document.getElementById("inNome") as HTMLInputElement).value;
        const tipo = (document.getElementById("inTipo") as HTMLInputElement).value;
        const genero = (document.getElementById("inGenero") as HTMLInputElement).value;
        const raca = (document.getElementById("inRaca") as HTMLInputElement).value;
        const petAtualizado = {
            pet_nome: nome,
            pet_tipo: tipo,
            pet_raca: raca,
            pet_genero: genero,
            cliente_id: pet?.cliente_id
        }
        if(pet){
            await petService.updatePet(pet.pet_id, petAtualizado)
        }
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
        return <Navigate to="/pet" />;
    }

    if (!pet) return null;

    return (
        <div className="container-fluid">
            <h2>Cadastrar Pet</h2>
            <form id="form-pet" onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome"
                                aria-label="Nome"
                                id="inNome"
                                defaultValue={pet.pet_nome}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Raça"
                                aria-label="Raça"
                                id="inRaca"
                                defaultValue={pet.pet_raca}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Gênero"
                                aria-label="Gênero"
                                id="inGenero"
                                defaultValue={pet.pet_genero}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tipo"
                                aria-label="Tipo"
                                id="inTipo"
                                defaultValue={pet.pet_tipo}
                            />
                        </div>
                    </Col>
                </Row>
                <div className="input-group mb-3">
                    <button className="btn-cadastrar" type="submit">Atualizar</button>
                </div>
            </form>

            <Modal
                isOpen={openModalCadastro}
                label="Confirma a atualização do pet?"
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
                label="Pet atualizado com sucesso"
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
