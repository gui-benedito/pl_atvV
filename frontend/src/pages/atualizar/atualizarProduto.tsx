import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Modal from "../../componentes/Modal";
import { produtoService } from "../../services/produtoService";

type Produto = {
    produto_id: number;
    produto_nome: string;
    produto_preco: number;
    produto_quantidade: number;
};

export default function AtualizarProduto() {
    const [produto, setProduto] = useState<Produto | null>(null);
    const [nomeState, setNomeState] = useState("");
    const [valorState, setValorState] = useState(0);
    const [quantidadeState, setQuantidadeState] = useState(0);
    const [redirectToLista, setRedirectToLista] = useState(false);
    const [openModalCadastro, setOpenModalCadastro] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    const fetchProduto = async (id: number) => {
        try {
            const foundProduto = await produtoService.getProdutoByID(id)
            if (foundProduto) {
                setProduto(foundProduto);
                setNomeState(foundProduto.produto_nome);
                setValorState(foundProduto.produto_preco);
                setQuantidadeState(foundProduto.produto_quantidade);
            }
        } catch (error) {
            console.error("Erro ao pegar produto:", error);
        }
    }

    useEffect(() => {
        const pathSegments = window.location.pathname.split('/');
        const id = Number(pathSegments[pathSegments.length - 1])
        if (id) {
            fetchProduto(id)
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOpenModalCadastro(true);
    };

    const confirmaAtualizacao = async () => {
        const nome = (document.getElementById("inNome") as HTMLInputElement).value;
        const preco = (document.getElementById("inPreco") as HTMLInputElement).value;
        const quantidade = (document.getElementById("inQuantidade") as HTMLInputElement).value;
        const produtoAtualizado = {
            produto_nome: nome,
            produto_preco: preco,
            produto_quantidade: quantidade
        }
        if(produto){
            await produtoService.updateProduto(produto.produto_id, produtoAtualizado)
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
        return <Navigate to="/produto" />;
    }

    if (!produto) return null;

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
                                value={nomeState}
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
                                onChange={(e) => setValorState(+e.target.value)}
                                value={valorState}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Quantidade"
                                aria-label="Quantidade"
                                id="inQuantidade"
                                onChange={(e) => setQuantidadeState(+e.target.value)}
                                value={quantidadeState}
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
                label="Confirma a atualização do produto?"
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
                label="Produto atualizado com sucesso"
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
