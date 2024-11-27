import { useState, useEffect } from "react";
import { Card, Col, Row, Form } from "react-bootstrap";
import "../css/style.css";
import { registrosService } from "../../services/registrosService";

type Consumido = {
    raca: string;
    tipoAnimal: string;
    tipo: string; // Identifica se é "produto" ou "serviço"
    nome: string;
    quantidade: number;
};

export default function ConsumidosPorPet() {
    const [listaConsumidos, setListaConsumidos] = useState<Consumido[]>([]);
    const [filtered, setFiltered] = useState<Consumido[]>([]);
    const [cabecalho, setCabecalho] = useState<string | null>(null);
    const [tipoAnimal, setTipoAnimal] = useState("");
    const [raca, setRaca] = useState("");
    const [racasDisponiveis, setRacasDisponiveis] = useState<string[]>([]);
    const [tipo, setTipo] = useState<string | null>(null); // Define se o filtro é por "produto" ou "serviço"
    const [error, setError] = useState<string | null>(null);

    const fetchPets = async () => {
        try {
            const lista = await registrosService.getPetRaca();
            console.log(lista);
            setListaConsumidos(lista); // Atualiza a lista de consumidos com a resposta da API
        } catch (error) {
            console.error(error);
            setError("Erro ao buscar dados. Tente novamente mais tarde.");
        }
    };

    useEffect(() => {
        fetchPets();
    }, []);

    const handleTipoAnimalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tipoSelecionado = e.target.value;
        const racasPorTipo: { [key: string]: string[] } = {
            Cachorro: ["Labrador", "Bulldog", "Poodle", "Pastor Alemão", "Golden Retriever", "SRD"],
            Gato: ["Persa", "Siamês", "Maine Coon", "Bengal", "Sphynx", "SRD"],
        };
        setTipoAnimal(tipoSelecionado);
        setRacasDisponiveis(racasPorTipo[tipoSelecionado] || []);
        setRaca(""); // Limpa a raça selecionada ao mudar o tipo animal
    };

    const handleRacaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRaca(e.target.value);
    };

    const aplicarFiltro = (tipoSelecionado: string) => {
        setTipo(tipoSelecionado); // Atualiza o tipo (produto ou serviço)

        // Aplica os filtros diretamente
        let resultados = listaConsumidos;

        if (tipoAnimal) {
            resultados = resultados.filter((item) => item.tipoAnimal === tipoAnimal);
        }

        if (raca) {
            resultados = resultados.filter((item) => item.raca === raca);
        }

        resultados = resultados.filter((item) => item.tipo === tipoSelecionado);

        setFiltered(resultados);

        // Atualiza o cabeçalho para refletir os filtros aplicados
        setCabecalho(
            `Itens Consumidos - ${tipoSelecionado.charAt(0).toUpperCase() + tipoSelecionado.slice(1)} (${
                tipoAnimal || "Todos"
            } - ${raca || "Todas as Raças"})`
        );
    };

    return (
        <div className="container-fluid valor-filtro">
            <h2>Filtrar por Tipo de Consumo, Tipo de Animal e/ou Raça</h2>
            <Row className="mb-3">
                <Col>
                    <Form.Select onChange={handleTipoAnimalChange} value={tipoAnimal}>
                        <option value="">Selecione o Tipo de Animal</option>
                        <option value="Cachorro">Cachorro</option>
                        <option value="Gato">Gato</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select onChange={handleRacaChange} value={raca} disabled={!racasDisponiveis.length}>
                        <option value="">Selecione a Raça</option>
                        {racasDisponiveis.map((raca, index) => (
                            <option key={index} value={raca}>
                                {raca}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col>
                    <div className="btn-group">
                        <button
                            onClick={() => aplicarFiltro("produto")}
                            className={`header-btn ${tipo === "produto" ? "active" : ""}`}
                        >
                            Produtos
                        </button>
                        <button
                            onClick={() => aplicarFiltro("servico")}
                            className={`header-btn ${tipo === "servico" ? "active" : ""}`}
                        >
                            Serviços
                        </button>
                    </div>
                </Col>
            </Row>
            <div className="Card-container container-registro">
                {cabecalho && <h3>{cabecalho}</h3>}
                {filtered.length > 0 ? (
                    filtered.map((item, index) => (
                        <Card key={index} className="card-main">
                            <Card.Body>
                                <div className="card-column">
                                    <span>
                                        <strong>Tipo Animal: </strong>
                                        {item.tipoAnimal}
                                    </span>
                                </div>
                                <div className="card-column">
                                    <span>
                                        <strong>Raça: </strong>
                                        {item.raca}
                                    </span>
                                </div>
                                <div className="card-column">
                                    <span>
                                        <strong>Tipo: </strong>
                                        {item.tipo}
                                    </span>
                                </div>
                                <div className="card-column">
                                    <span>
                                        <strong>Nome: </strong>
                                        {item.nome}
                                    </span>
                                </div>
                                <div className="card-column">
                                    <span>
                                        <strong>Quantidade: </strong>
                                        {item.quantidade}
                                    </span>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>Nenhum item encontrado.</p>
                )}
            </div>
        </div>
    );
}
