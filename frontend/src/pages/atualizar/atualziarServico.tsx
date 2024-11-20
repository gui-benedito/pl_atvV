import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Modal from "../../componentes/Modal";
import { servicoService } from "../../services/servicoService";

type Servico = {
    servico_id: number;
    servico_nome: string;
    servico_preco: number;
    onExcluir: (id: number) => void;
};

export default function AtualizarServico() {
    const [servico, setServico] = useState<Servico | null>(null);
    const [nomeState, setNomeState] = useState("");
    const [precoState, setPrecoState] = useState(0);
    const [redirectToLista, setRedirectToLista] = useState(false);
    const [openModalCadastro, setOpenModalCadastro] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    const fetchServico = async(id: number) => {
        try {
            const servicoFound = await servicoService.getServicoByID(id)
            setServico(servicoFound)
            console.log(servicoFound)
        } catch (error) {
            console.error("Erro ao pegar serviço:", error);
        }
    }

    useEffect(() => {
        const pathSegments = window.location.pathname.split('/');
        const id = Number(pathSegments[pathSegments.length - 1])
        if (id) {
            fetchServico(id)
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOpenModalCadastro(true);
    };

    const confirmaAtualizacao = async () => {
        const nome = (document.getElementById("inNome") as HTMLInputElement).value;
        const preco = (document.getElementById("inPreco") as HTMLInputElement).value;
        const servicoAtualizado = {
            servico_nome: nome,
            servico_preco: preco
        }
        if(servico){
            await servicoService.updateServico(servico.servico_id, servicoAtualizado)
        }
        setOpenModalCadastro(false);
        setOpenModalMensagem(true);
    };

    const closeModalCadastro = () => setOpenModalCadastro(false);
    const closeModalMensagem = () => setOpenModalMensagem(false);

    const redirect = () => {
        setTimeout(() => setRedirectToLista(true), 500);
    };

    if (redirectToLista) {
        return <Navigate to="/servico" />;
    }

    if (!servico) return null;

    return (
        <div className="container-fluid">
            <h2>Atualizar Produto</h2>
            <form id="form-produto" onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome"
                                aria-label="Nome"
                                id="inNome"
                                onChange={(e) => setNomeState(e.target.value)}
                                defaultValue={servico.servico_nome}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Preco"
                                aria-label="Preco"
                                id="inPreco"
                                onChange={(e) => setPrecoState(+e.target.value)}
                                defaultValue={servico.servico_preco}
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
                label="Confirma a atualização do serviço?"
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
                label="Serviço atualizado com sucesso"
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
