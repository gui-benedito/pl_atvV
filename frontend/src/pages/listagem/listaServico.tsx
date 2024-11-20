import { useState, useEffect } from "react";
import ServicoCard from "./servicoCard";
import imgSemServio from "../../images/servico-vazio.jpg";
import Modal from "../../componentes/Modal";
import { servicoService } from "../../services/servicoService";

type Servico = {
    servico_id: number;
    servico_nome: string;
    servico_preco: number;
};

export default function ListaServico() {
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [servicoIdparaExcluir, setServicoIdparaExcluir] = useState<number | null>(null);
    const [openModalExcluir, setOpenModalExcluir] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    const fetchServico = async () => {
        try {
            const servicosFound = await servicoService.getAllServico()
            setServicos(servicosFound)
        } catch (error) {
            console.error("Erro ao pegar serviços:", error);
        }
    }

    useEffect(() => {
        fetchServico()
    }, []);

    const closeModalExcluir = () => setOpenModalExcluir(false);

    const openModalConfirmaExcluir = (id: number) => {
        setServicoIdparaExcluir(id);
        setOpenModalExcluir(true);
    };

    const closeModalMensagem = () => setOpenModalMensagem(false);

    const confirmaExcluir = async () => {
        if (servicoIdparaExcluir !== null) {
            await servicoService.deleteServico(servicoIdparaExcluir)
            fetchServico()
            setOpenModalExcluir(false);
            setServicoIdparaExcluir(null);
            setOpenModalMensagem(true);
        }
    };

    return (
        <>
            <div className="header">
                <h2>Lista de Servicos</h2>
                <a href="/servico" key="lista"><button className="header-btn">Lista</button></a>
                <a href="/servico/cadastro" key="cadastrar"><button className="header-btn">Cadastrar</button></a>
            </div>
            <div className="Card-container">
                {servicos.length <= 0 ? (
                    <div className="lista-vazia">
                        <img src={imgSemServio} alt="Sem serviços" />
                    </div>
                ) : (
                    servicos.map((servico) => (
                        <ServicoCard
                            key={servico.servico_id}
                            servico_id={servico.servico_id}
                            servico_nome={servico.servico_nome}
                            servico_preco={servico.servico_preco}
                            onExcluir={() => openModalConfirmaExcluir(servico.servico_id)}
                        />
                    ))
                )}
                <Modal
                    isOpen={openModalExcluir}
                    label="Confirma a exclusão do serviço?"
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
                    label="Serviço excluído com sucesso"
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
