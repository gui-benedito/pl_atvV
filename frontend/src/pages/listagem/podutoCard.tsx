import { Card } from "react-bootstrap";
import { BsFillPencilFill, BsXLg } from "react-icons/bs";

type ProdutoProps = {
    produto_id: number;
    produto_nome: string;
    produto_preco: number;
    produto_quantidade: number;
    onExcluir: (id: number) => void;
};

export default function ProdutoCard({ produto_id, produto_nome, produto_preco, produto_quantidade, onExcluir }: ProdutoProps) {
    return (
        <Card key={produto_id} className="card-main">
            <Card.Body>
                <div className="card-item">
                    <div className="card-column">
                        <span><strong>Nome: </strong>{produto_nome}</span>
                    </div>
                    <div className="card-column">
                        <span><strong>Preço: </strong>R${produto_preco.toFixed(2)}</span>
                    </div>
                    <div className="card-column">
                        <span><strong>Quantidade: </strong>{produto_quantidade}</span>
                    </div>
                    <div className="card-icons">
                        <a href={`/produto/atualizar/${produto_id}`} style={{ color: 'blue' }}>
                            <BsFillPencilFill />
                        </a>
                        <BsXLg className="icon" style={{ color: 'red' }} onClick={() => onExcluir(produto_id)} />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
