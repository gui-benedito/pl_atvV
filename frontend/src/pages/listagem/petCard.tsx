import { useState } from "react";
import { Card } from "react-bootstrap";
import { BsFillPencilFill, BsXLg } from "react-icons/bs";
import '../css/style.css';

type Props = {
    pet_id: number
    pet_nome: string;
    pet_genero: string;
    pet_tipo: string;
    pet_raca: string;
    tutorNome: string
    onExcluir: (pet_id: number) => void;
};

export default function PetCard({ pet_id, pet_nome, pet_genero, pet_tipo, pet_raca, tutorNome, onExcluir }: Props) {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);

    return (
        <Card key={`${pet_id}`} className="card-main">
            <Card.Body>
                <div className="card-item">
                    <div className="card-column">
                        <span><strong>Nome:</strong> {pet_nome}</span>
                    </div>
                    <div className="card-column">
                        <span><strong>Raça:</strong> {pet_raca}</span>
                    </div>
                    <div className="card-column">
                        <span><strong>Gênero:</strong> {pet_genero}</span>
                    </div>
                    <div className="card-column">
                        <span><strong>Tipo:</strong> {pet_tipo}</span>
                    </div>
                    <div className="card-column">
                        <span><strong>Tutor:</strong> {tutorNome}</span>
                    </div>
                    <div className="card-icons">
                        <a href={`/pet/atualizar/${pet_id}`} style={{ color: 'blue' }}>
                            <BsFillPencilFill />
                        </a>
                        <BsXLg className="icon" style={{ color: 'red' }} onClick={() => onExcluir(pet_id)} />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
