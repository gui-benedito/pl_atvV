import { useState } from "react";
import { Card } from "react-bootstrap";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import '../css/style.css';

type Props = {
    id: number;
    nome: string;
    compras: Compra[]
};

type Compra = {
    compra_id: number
    produto_id: number | null
    servico_id: number | null
    cliente_id: number
    pet_id: number | null
    quantidade: number
    valor: number
}

type Produto = {
    produto_id: number;
    produto_nome: string;
    produto_preco: number;
    produto_quantidade: number;
};

type Servico = {
    servico_id: number;
    servico_nome: string;
    servico_preco: number;
};

export default function ConsumoCard({id, nome, compras}: Props, {compra_id, produto_id, servico_id, cliente_id, pet_id, quantidade, valor}: Compra) {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);

    const valorTotal = compras.reduce((acc, current) => {
        acc += current.valor
        return acc
    }, 0)

    return (
        <Card key={id} className="card-main">
            <Card.Body>
                <div className="card-item">
                    <div className="card-column">
                        <span><strong>Nome:</strong> {nome}</span>
                    </div>
                    <div className="card-icons">
                        {show ? 
                            <BsArrowUp onClick={toggleShow} style={{ color: 'blue' }} className="icon" /> : 
                            <BsArrowDown onClick={toggleShow} style={{ color: 'blue' }} className="icon" />
                        }
                    </div>
                </div>
                {show && (
                    <div className="card-infos">
                        <div className="card-sub-infos">
                            {compras.length <= 0 && (
                                <strong>Sem consumos</strong>
                            )}
                            {compras.length > 0 && (
                                <strong>Consumidos:</strong>
                            )}
                            {compras.map((c) => (
                                <>
                                    <span>{c.valor}</span>
                                </>
                            ))}
                            {compras.length > 0 && (
                                <span><strong>Total: </strong>{valorTotal}</span>
                            )}
                        </div>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}
