import { useState, useEffect } from "react";
import ProdutoCard from "./podutoCard";
import imgSemProduto from "../../images/produto-vazio.webp";
import Modal from "../../componentes/Modal";
import { produtoService } from "../../services/produtoService";

type Produto = {
    produto_id: number;
    produto_nome: string;
    produto_preco: number;
    produto_quantidade: number;
};

export default function ListaProduto() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [produtoIdParaExcluir, setProdutoIdParaExcluir] = useState<number | null>(null);
    const [openModalExcluir, setOpenModalExcluir] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    const fetchProdutos = async() => {
        try {
            const storedProdutos = await produtoService.getAllProduto()
            setProdutos(storedProdutos);
        } catch (error) {
            console.error("Erro ao pegar produtos:", error);
        }
    }

    useEffect(() => {
        fetchProdutos()
    }, []);

    const closeModalExcluir = () => setOpenModalExcluir(false);

    const openModalConfirmaExcluir = (id: number) => {
        setProdutoIdParaExcluir(id);
        setOpenModalExcluir(true);
    };

    const closeModalMensagem = () => setOpenModalMensagem(false);

    const confirmaExcluir = async () => {
        if (produtoIdParaExcluir !== null) {
            await produtoService.deleteProduto(produtoIdParaExcluir)
            fetchProdutos()
            setOpenModalExcluir(false);
            setProdutoIdParaExcluir(null);
            setOpenModalMensagem(true);
        }
    };

    return (
        <>
            <div className="header">
                <h2>Lista de Produtos</h2>
                <a href="/produto" key="lista"><button className="header-btn">Lista</button></a>
                <a href="/produto/cadastro" key="cadastrar"><button className="header-btn">Cadastrar</button></a>
            </div>
            <div className="Card-container">
                {produtos.length <= 0 ? (
                    <div className="lista-vazia">
                        <img src={imgSemProduto} alt="Sem produtos" />
                    </div>
                ) : (
                    produtos.map((produto) => (
                        <ProdutoCard
                            key={produto.produto_id}
                            produto_id={produto.produto_id}
                            produto_nome={produto.produto_nome}
                            produto_preco={produto.produto_preco}
                            produto_quantidade={produto.produto_quantidade}
                            onExcluir={() => openModalConfirmaExcluir(produto.produto_id)}
                        />
                    ))
                )}
                <Modal
                    isOpen={openModalExcluir}
                    label="Confirma a exclusão do produto?"
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
                    label="Produto excluído com sucesso"
                    buttons={
                        <div className="confirma-buttons">
                            <button onClick={closeModalMensagem} className="btn btn-secondary">Ok</button>
                        </div>
                    }
                >
                    <></>
                </Modal>
            </div>
        </>
    );
}
