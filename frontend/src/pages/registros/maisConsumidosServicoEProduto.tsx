import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import '../css/style.css';
import { registrosService } from "../../services/registrosService";

type ClienteOrdenado = Record<string, number>;

export default function MaisConsumidosServicoEProduto() {
    const [produtoOrdenado, setProdutoOrdenado] = useState<ClienteOrdenado>({});
    const [servicoOrdenado, setServicoOrdenado] = useState<ClienteOrdenado>({});
    const [filtered, setFiltered] = useState<ClienteOrdenado>({});
    const [cabecalho, setCabecalho] = useState("");
    const [error, setError] = useState<string | null>(null);

    const fetchClientes = async () => {
        try {
            const { produtoOrdenado, servicoOrdenado } = await registrosService.getConsumoGeral();
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
            setFiltered(produtoOrdenado);
            setCabecalho("Produtos");
        } else {
            setFiltered(servicoOrdenado);
            setCabecalho("Serviços");
        }
    };
    return (
        <>
            <div className="btn-filtro">
                <button onClick={() => filtrarClientes("produto")} className="header-btn">Produto</button>
                <button onClick={() => filtrarClientes("servico")} className="header-btn">Serviço</button>
            </div>
            <div className="Card-container container-registro">
            {cabecalho && <h3>{cabecalho}</h3>}
                {error && <div className="error-message">{error}</div>}
                {Object.keys(filtered).length > 0 ? (
                    Object.entries(filtered).map(([nome, qtd], index) => (
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
