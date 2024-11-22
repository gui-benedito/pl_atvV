import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import '../css/style.css';
import { clienteService } from "../../services/clienteService";
import { registrosService } from "../../services/registrosService";

type ClienteSorted = {
    nome: string;
    valor: number;
}[];

export default function MaisConsumidosValor() {
    const [clientes, setClientes] = useState<ClienteSorted>([])
    const [cabecalho, setCabecalho] = useState('')

    const fetchClientes = async () => {
        try {
            const clientesFounded = await registrosService.getTopCinco()
            clientesFounded ? setCabecalho('Clientes que mais consumiram') : setCabecalho('Sem consumo')
            setClientes(clientesFounded)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchClientes()
    }, []);

    return (
        <div className="Card-container card-valor container-registro">
            {cabecalho && <h3>{cabecalho}</h3>}
            {clientes.length > 0 &&
                clientes.map((c, index) => (
                    <Card key={index} className="card-main">
                        <Card.Body>
                            <div className="card-column">
                                <span><strong>Nome: </strong>{c.nome}</span>
                            </div>
                            <div className="card-column">
                                <span><strong>Valor: </strong>R$ {c.valor.toFixed(2)}</span>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    );
}
