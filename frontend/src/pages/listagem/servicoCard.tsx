import { Card } from "react-bootstrap";
import { BsFillPencilFill, BsXLg } from "react-icons/bs";

type ServicoProps = {
    servico_id: number;
    servico_nome: string;
    servico_preco: number;
    onExcluir: (id: number) => void;
};

export default function ServicoCard({ servico_id, servico_nome, servico_preco, onExcluir }: ServicoProps) {
    return (
        <Card key={servico_id} className="card-main">
            <Card.Body>
                <div className="card-item">
                    <div className="card-column">
                        <span><strong>Nome: </strong>{servico_nome}</span>
                    </div>
                    <div className="card-column">
                        <span><strong>Valor: </strong>R${servico_preco.toFixed(2)}</span>
                    </div>
                    <div className="card-icons">
                        <a href={`/servico/atualizar/${servico_id}`} style={{ color: 'blue' }}>
                            <BsFillPencilFill />
                        </a>
                        <BsXLg className="icon" style={{ color: 'red' }} onClick={() => onExcluir(servico_id)} />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
