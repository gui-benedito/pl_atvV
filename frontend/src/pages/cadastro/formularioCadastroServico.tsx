import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Modal from "../../componentes/Modal";
import Servico from "../../modelo/servico";
import { servicoService } from "../../services/servicoService";

export default function FormularioCadastroServico() {
    const [nomeState, setNomeState] = useState("");
    const [precoState, setPrecoState] = useState(0);
    const [redirectToLista, setRedirectToLista] = useState(false);
    const [openModalCadastro, setOpenModalCadastro] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    const handleNome = (nome: string) => setNomeState(nome);
    const handlePreco = (preco: number) => setPrecoState(preco);

    const closeModalCadastro = () => setOpenModalCadastro(false);
    const closeModalMensagem = () => setOpenModalMensagem(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpenModalCadastro(true);
    };

    const confirmaCadastro = async () => {
        const newServico = {
            servico_nome: nomeState,
            servico_preco: precoState
        }
        await servicoService.saveServico(newServico)
        setOpenModalCadastro(false);
        setOpenModalMensagem(true);
    };

    const redirect = () => {
        setTimeout(() => {
            setRedirectToLista(true);
        }, 1000);
    };

    if (redirectToLista) {
        return <Navigate to="/servico" />;
    }

    return (
        <>
            <div className="header">
                <h2>Cadastrar Serviço</h2>
                <a href="/servico" key="lista"><button className="header-btn">Lista</button></a>
                <a href="/servico/cadastro" key="cadastrar"><button className="header-btn">Cadastrar</button></a>
            </div>
            <form id="form-produto" onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome"
                                aria-label="Nome"
                                aria-describedby="basic-addon1"
                                id="inNome"
                                onChange={(e) => handleNome(e.target.value)}
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
                                aria-describedby="basic-addon1"
                                id="inPreco"
                                onChange={(e) => handlePreco(+e.target.value)}
                            />
                        </div>
                    </Col>
                </Row>
                <div className="input-group mb-3">
                    <button className="btn-cadastrar" type="submit">Cadastrar</button>
                </div>
            </form>

            <Modal
                isOpen={openModalCadastro}
                label="Confirma o cadastro do serviço?"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={closeModalCadastro} className="btn btn-danger">Cancelar</button>
                        <button onClick={confirmaCadastro} className="btn btn-primary">Confirmar</button>
                    </div>
                }
            >
                <></>
            </Modal>

            <Modal
                isOpen={openModalMensagem}
                label="Serviço cadastrado com sucesso"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={redirect} className="btn btn-secondary">Ok</button>
                    </div>
                }
            >
                <></>
            </Modal>
        </>
    );
}
