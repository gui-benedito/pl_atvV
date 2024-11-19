import { useState } from "react";
import { Card } from "react-bootstrap";
import { BsArrowDown, BsArrowUp, BsFillPencilFill, BsXLg } from "react-icons/bs";
import '../css/style.css';

type Pet = {
    nome: string;
    genero: string;
    tipo: string;
    raca: string;
};

type Props = {
    cliente_id: number;
    cliente_nome: string;
    cliente_nomeSocial: string;
    cliente_cpf: string
    emissao_cpf: string
    cliente_rg: string
    emissao_rg: string
    cliente_telefone: string;
    cliente_email: string;
    pets: Pet[];
    onExcluir: (id: number) => void;
};

export default function ClienteCard({
    cliente_id,
    cliente_nome,
    cliente_nomeSocial,
    cliente_cpf,
    emissao_cpf,
    cliente_rg,
    emissao_rg,
    cliente_telefone,
    cliente_email,
    onExcluir,
}: Props) {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);

    return (
        <Card key={cliente_id} className="card-main">
            <Card.Body>
                <div className="card-item">
                    <div className="card-column">
                        <span><strong>Nome Social:</strong></span><span> {cliente_nomeSocial}</span>
                    </div>
                    <div className="card-column">
                        <span><strong>Telefone:</strong> {cliente_telefone}</span>
                    </div>
                    <div className="card-column">
                        <span><strong>Email:</strong></span><span> {cliente_email}</span>
                    </div>
                    <div className="card-icons">
                        {show ? (
                            <BsArrowUp onClick={toggleShow} style={{ color: 'blue' }} className="icon" />
                        ) : (
                            <BsArrowDown onClick={toggleShow} style={{ color: 'blue' }} className="icon" />
                        )}
                        <a href={`/cliente/atualizar/${cliente_id}`} style={{ color: 'blue' }}>
                            <BsFillPencilFill />
                        </a>
                        <BsXLg className="icon" style={{ color: 'red' }} onClick={() => onExcluir(cliente_id)} />
                    </div>
                </div>
                {show && (
                    <>
                        <div className="card-infos">
                            <div className="card-column">
                                <span><strong>Nome:</strong> {cliente_nome}</span>
                            </div>
                            <div className="card-column docs">
                                <span><strong>CPF:</strong> {cliente_cpf}</span>
                                <span><strong>Data de Emissão:</strong> {emissao_cpf}</span>
                            </div>
                            <div className="card-column docs">
                                <span><strong>RG:</strong> {cliente_rg}</span>
                                <span><strong>Data de Emissão:</strong> {emissao_rg}</span>
                            </div>
                        </div>
                        {/* <div className="card-infos-pets">
                            {pets.length > 0 && (
                                <>
                                    <h6>Pets:</h6>
                                    {pets.map((pet, index) => (
                                        <span key={index}><strong>Nome:</strong> {pet.nome}</span>
                                    ))}
                                </>
                            )}
                        </div> */}
                    </>
                )}
            </Card.Body>
        </Card>
    );
}
