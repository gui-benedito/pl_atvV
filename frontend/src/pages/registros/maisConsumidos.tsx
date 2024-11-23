import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "../css/style.css";
import { registrosService } from "../../services/registrosService";

type ClienteOrdenado = Record<string, number>; // Objeto onde a chave é o nome e o valor é a quantidade

export default function MaisConsumidos() {
    const [produtoOrdenado, setProdutoOrdenado] = useState<ClienteOrdenado>({});
    const [servicoOrdenado, setServicoOrdenado] = useState<ClienteOrdenado>({});
    const [clientesFiltered, setClientesFiltered] = useState<ClienteOrdenado>({});
    const [cabecalho, setCabecalho] = useState("");
    const [error, setError] = useState<string | null>(null);

    const fetchClientes = async () => {
        try {
            const { produtoOrdenado, servicoOrdenado } = await registrosService.getTopDez();
            setProdutoOrdenado(produtoOrdenado);
            setServicoOrdenado(servicoOrdenado);
        } catch (error) {
            setError("Erro ao buscar dados. Tente novamente mais tarde.");
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const filtrarClientes = (tipo: "produto" | "servico") => {
        if (tipo === "produto") {
            setClientesFiltered(produtoOrdenado);
            setCabecalho("Mais consumiram produtos");
        } else {
            setClientesFiltered(servicoOrdenado);
            setCabecalho("Mais consumiram serviços");
        }
    };

    return (
        <>
            <div className="btn-filtro">
                <button onClick={() => filtrarClientes("produto")} className="header-btn">
                    Produto
                </button>
                <button onClick={() => filtrarClientes("servico")} className="header-btn">
                    Serviço
                </button>
            </div>

            <div className="Card-container container-registro">
                {cabecalho && <h3>{cabecalho}</h3>}
                {error && <div className="error-message">{error}</div>}
                {Object.keys(clientesFiltered).length > 0 ? (
                    Object.entries(clientesFiltered).map(([nome, qtd], index) => (
                        <Card key={index} className="card-main">
                            <Card.Body>
                                <div className="card-column">
                                    <span>
                                        <strong>Nome: </strong>
                                        {nome}
                                    </span>
                                </div>
                                <div className="card-column">
                                    <span>
                                        <strong>Quantidade: </strong>
                                        {qtd}
                                    </span>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <div className="no-data">Selecione o tipo</div>
                )}
            </div>
        </>
    );
}
