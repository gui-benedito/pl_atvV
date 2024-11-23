import { useState, useEffect } from "react";
import Cliente from "../../modelo/cliente";
import { Card, Col, Row, Form } from "react-bootstrap";
import '../css/style.css';
import { registrosService } from "../../services/registrosService";

type ClienteOrdenado = Record<string, number>;

export default function ConsumidosPorPet() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [filtered, setFiltered] = useState<ClienteOrdenado[]>([]);
    const [cabecalho, setCabecalho] = useState<string | null>(null);
    const [tipo, setTipo] = useState("");
    const [raca, setRaca] = useState("");
    const [racasDisponiveis, setRacasDisponiveis] = useState<string[]>([]);
    const [cachorros, setCachorros] = useState<ClienteOrdenado[]>([])
    const [gatos, setGatos] = useState<ClienteOrdenado[]>([])
    const [error, setError] = useState<string | null>(null);

    const fetchPets = async () => {
        try {
            const { Gato, Cachorro } = await registrosService.getPetRaca()
            setCachorros(Cachorro)
            setCachorros(Gato)
        } catch (error) {
            setError("Erro ao buscar dados. Tente novamente mais tarde.");
        }
    }

    useEffect(() => {
        fetchPets()
    }, []);

    const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tipoSelecionado = e.target.value;
        const racasPorTipo: { [key: string]: string[] } = {
            Cachorro: ["Labrador", "Bulldog", "Poodle", "Pastor Alemão", "Golden Retriever", "SRD"],
            Gato: ["Persa", "Siamês", "Maine Coon", "Bengal", "Sphynx", "SRD"]
        };
        setTipo(tipoSelecionado);
        setRacasDisponiveis(racasPorTipo[tipoSelecionado] || []);
        setRaca("");
    };

    const handleRacaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRaca(e.target.value)
    };

    const filtrarConsumidos = (tipo: string) => {
        return 
    }

    return (
        <div className="container-fluid valor-filtro">
            <h2>Filtrar por Tipo e/ou Raça de Pet</h2>
            <Row className="mb-3">
                <Col>
                    <Form.Select onChange={handleTipoChange} value={tipo}>
                        <option value="">Selecione o Tipo</option>
                        <option value="Cachorro">Cachorro</option>
                        <option value="Gato">Gato</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select onChange={handleRacaChange} value={raca} disabled={!racasDisponiveis.length}>
                        <option value="">Selecione a Raça</option>
                        {racasDisponiveis.map((raca, index) => (
                            <option key={index} value={raca}>{raca}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
            <div className="btn-filtro mb-3">
                <button onClick={() => filtrarConsumidos("produto")} className="header-btn">Filtrar Produtos</button>
                <button onClick={() => filtrarConsumidos("servico")} className="header-btn">Filtrar Serviços</button>
            </div>
            <div className="Card-container container-registro">
                {cabecalho && <h3>{cabecalho}</h3>}
                {filtered.length > 0 && (
                    filtered.map((c, index) => (
                        <Card key={index} className="card-main">
                            <Card.Body>
                                <div className="card-column">
                                    <span><strong>Nome: </strong>{c.name}</span>
                                </div>
                                <div className="card-column">
                                    <span><strong>Quantidade: </strong>{c.total}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
