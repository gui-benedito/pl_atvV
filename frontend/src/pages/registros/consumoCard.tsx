import { useState } from "react";
import { Card, Table } from "react-bootstrap";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import '../css/style.css';

type Props = {
    id: number;
    nome: string;
    compras: Compra[];
};

type Compra = {
    compra_id: number;
    produto_id: number | null;
    servico_id: number | null;
    cliente_id: number;
    pet_id: number | null;
    quantidade: number;
    valor: number;
    produto: {
        produto_id: number;
        produto_nome: string;
        produto_preco: number;
    } | null;
    servico: {
        servico_id: number;
        servico_nome: string;
        servico_preco: number;
    } | null;
};

export default function ConsumoCard({ id, nome, compras }: Props) {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);

    const valorTotal = compras.reduce((acc, current) => acc + current.valor, 0);

    return (
        <Card key={id} className="card-main">
            <Card.Body>
                <div className="card-item">
                    <div className="card-column">
                        <span><strong>Nome:</strong> {nome}</span>
                        <span><strong>Total Gasto:</strong> R$ {valorTotal.toFixed(2)}</span>
                    </div>
                    <div className="card-icons">
                        {show ? (
                            <BsArrowUp onClick={toggleShow} style={{ color: 'blue' }} className="icon" />
                        ) : (
                            <BsArrowDown onClick={toggleShow} style={{ color: 'blue' }} className="icon" />
                        )}
                    </div>
                </div>
                {show && (
                    compras.length <= 0 ? (
                        <div className="mt-3">Nenhuma compra registrada.</div>
                    ) : (
                        <Table striped bordered hover size="sm" className="mt-3">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Quantidade</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(() => {
                                    const groupedItems: { nome: string; quantidade: number; subtotal: number }[] = [];

                                    compras.forEach((compra) => {
                                        // Adiciona Produto
                                        if (compra.produto) {
                                            const produtoNome = compra.produto.produto_nome;
                                            const produtoPreco = compra.produto.produto_preco || 0;
                                            const quantidade = compra.quantidade;

                                            const existing = groupedItems.find(
                                                (item) => item.nome === produtoNome
                                            );
                                            if (existing) {
                                                existing.quantidade += quantidade;
                                                existing.subtotal += quantidade * produtoPreco;
                                            } else {
                                                groupedItems.push({
                                                    nome: produtoNome,
                                                    quantidade,
                                                    subtotal: quantidade * produtoPreco,
                                                });
                                            }
                                        }

                                        // Adiciona Serviço
                                        if (compra.servico) {
                                            const servicoNome = compra.servico.servico_nome;
                                            const servicoPreco = compra.servico.servico_preco || 0;

                                            const existing = groupedItems.find(
                                                (item) => item.nome === servicoNome
                                            );
                                            if (existing) {
                                                existing.quantidade += 1; // Serviços não têm "quantidade" no exemplo
                                                existing.subtotal += servicoPreco;
                                            } else {
                                                groupedItems.push({
                                                    nome: servicoNome,
                                                    quantidade: 1,
                                                    subtotal: servicoPreco,
                                                });
                                            }
                                        }
                                    });

                                    return groupedItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.nome}</td>
                                            <td>{item.quantidade}</td>
                                            <td>R$ {item.subtotal.toFixed(2)}</td>
                                        </tr>
                                    ));
                                })()}
                            </tbody>
                        </Table>
                    )
                )}
            </Card.Body>
        </Card>
    );
}
