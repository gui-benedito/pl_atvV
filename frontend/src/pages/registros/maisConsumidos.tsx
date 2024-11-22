import { useEffect, useState } from "react";
import Cliente from "../../modelo/cliente";
import { Card } from "react-bootstrap";
import '../css/style.css';
import { registrosService } from "../../services/registrosService";

type ClienteSortedItem = {
    nome: string;
    qtd: number;
};

export default function MaisConsumidos() {
    const [clientes, setClientes] = useState([])
    const [clientesFiltered, setClientesFiltered] = useState([])
    const [cabecalho, setCabecalho] = useState('')

    const fetchClientes = async () => {
        try {
            const listaClientes = await registrosService.getTopDez()
            await setClientes(listaClientes)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchClientes()
    }, [clientesFiltered]);

    const dezProdutosMaisConsumidos = () => {
        
    }

    const dezServicosMaisConsumidos = () => {

    }

    return (
        <>
            <div className="btn-filtro">
                <button onClick={dezProdutosMaisConsumidos} className="header-btn">Produto</button>
                <button onClick={dezServicosMaisConsumidos} className="header-btn">Serviço</button>
            </div>
            <div className="Card-container container-registro">
                {cabecalho && <h3>{cabecalho}</h3>}
                {clientesFiltered.length > 0 &&
                    clientesFiltered.map((c, index) => (
                        <Card key={index} className="card-main">
                            <Card.Body>
                                <div className="card-column">
                                    {/* <span><strong>Nome: </strong>{c.nome}</span> */}
                                </div>
                                <div className="card-column">
                                    {/* <span><strong>Quantidade: </strong>{c.qtd}</span> */}
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
        </>
    );
}
