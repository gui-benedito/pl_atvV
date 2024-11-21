import { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import '../css/style.css';
import Modal from "../../componentes/Modal";
import { clienteService } from "../../services/clienteService";
import { produtoService } from "../../services/produtoService";
import { servicoService } from "../../services/servicoService";
import { petService } from "../../services/petService";
import { compraService } from "../../services/compraService";

type Cliente = {
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
};

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

type Pet = {
    pet_id: number
    pet_nome: string
    pet_raca: string
    pet_tipo: string
    pet_genero: string
    cliente_id: number
};

export default function Venda() {
    const [clientes, setClientes] = useState<Cliente[] | null>();
    const [produtos, setProdutos] = useState<Produto[] | null>();
    const [servicos, setServicos] = useState<Servico[] | null>();
    const [pets, setPets] = useState<Pet[] | null>()
    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
    const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);
    const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);
    const [quantidade, setQuantidade] = useState<number | null>(null);
    const [openModalCadastro, setOpenModalCadastro] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);
    const [openModalMensagemQuantidade, setOpenModalMensagemQuantidade] = useState(false);

    const formRef = useRef<HTMLFormElement | null>(null)

    const fetchClientes = async () => {
        try {
            const clientesData = await clienteService.getAllClientes();
            setClientes(clientesData);
        } catch (error) {
            console.error("Error setting clientes:", error);
        }
    }

    const fetchServico = async () => {
        try {
            const servicosFound = await servicoService.getAllServico()
            setServicos(servicosFound)
        } catch (error) {
            console.error("Erro ao pegar serviços:", error);
        }
    }

    const fetchProdutos = async() => {
        try {
            const storedProdutos = await produtoService.getAllProduto()
            setProdutos(storedProdutos);
        } catch (error) {
            console.error("Erro ao pegar produtos:", error);
        }
    }

    const fetchPets = async () => {
        try {
            const pets = await petService.getAllPets()
            setPets(pets)
        } catch (error) {
            console.error("Erro ao pegar pets:", error);
        }
    }

    useEffect(() => {
        fetchServico()
        fetchClientes()
        fetchProdutos()
        fetchPets()
    }, []);

    const handleQuantidade = (quantidade: number) => setQuantidade(quantidade);

    const handleCliente = (id: number) => {
        const cliente = clientes?.find((c) => c.cliente_id === id) || null;
        setClienteSelecionado(cliente);
    };

    const handleProduto = (id: number) => {
        const produto = produtos?.find((c) => c.produto_id === id) || null;
        setProdutoSelecionado(produto);
    };

    const handleServico = (id: number) => {
        const servico = servicos?.find((c) => c.servico_id === id) || null;
        setServicoSelecionado(servico);
    };

    const handlePet = (id: number) => {
        const pet = pets?.find((c) => c.pet_id === id) || null;
        setPetSelecionado(pet);
    };

    const closeModalMensagemQuantidade = () => setOpenModalMensagemQuantidade(false);
    const closeModalCadastro = () => setOpenModalCadastro(false);
    const closeModalMensagem = () => setOpenModalMensagem(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (produtoSelecionado && !quantidade) {
            setOpenModalMensagemQuantidade(true);
        } else {
            setOpenModalCadastro(true);
        }
    };

    const confirmaCadastro = async() => {
        const newCompra = {
            produto_id: produtoSelecionado?.produto_id,
            servico_id: servicoSelecionado?.servico_id,
            cliente_id: clienteSelecionado?.cliente_id,
            pet_id: petSelecionado?.pet_id,
            quantidade: quantidade,
            valor: 0
        }
        console.log(newCompra)
        await compraService.saveCompra(newCompra)
        setClienteSelecionado(null)
        setProdutoSelecionado(null)
        setServicoSelecionado(null)
        setPetSelecionado(null)
        setQuantidade(null)
        setOpenModalCadastro(false)
        formRef.current?.reset()
    };

    if (!clientes || !produtos || !servicos || !pets) return null;

    return (
        <div className="form-venda">
            <form onSubmit={handleSubmit} id="formVenda" ref={formRef}>
                <Row>
                    <Col>
                        <Form.Select aria-label="Selecione o tutor" className="tutor-select" onChange={(e) => handleCliente(+e.target.value)}>
                            <option value={0}>Selecione o cliente</option>
                            {clientes.map((c: Cliente) => (
                                <option value={c.cliente_id} key={c.cliente_id}>
                                    {c.cliente_nome}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select aria-label="Selecione o tutor" className="tutor-select" onChange={(e) => handleProduto(+e.target.value)}>
                            <option value={0}>Selecione o produto</option>
                            {produtos.map((p: Produto) => (
                                <option value={p.produto_id} key={p.produto_id}>
                                    {p.produto_nome}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <div className="input-group mb-3">
                            <input type="number" className="form-control" placeholder="Quantidade" aria-label="Quantidade" onChange={(e) => handleQuantidade(+e.target.value)} />
                        </div>
                    </Col>
                    <Col>
                        <Form.Select aria-label="Selecione o tutor" className="tutor-select" onChange={(e) => handleServico(+e.target.value)}>
                            <option value={0}>Selecione o serviço</option>
                            {servicos.map((s: Servico) => (
                                <option value={s.servico_id} key={s.servico_id}>
                                    {s.servico_nome}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select aria-label="Selecione o tutor" className="tutor-select" onChange={(e) => handlePet(+e.target.value)}>
                            <option value={0}>Selecione o pet</option>
                            {clienteSelecionado?.pets.map((p: Pet) => (
                                <option value={p.pet_id} key={p.pet_id}>
                                    {p.pet_nome}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
                <div className="input-group mb-3">
                    <button className="btn-cadastrar-venda" type="submit">Cadastrar Venda</button>
                </div>
            </form>

            <Modal
                isOpen={openModalCadastro}
                label="Confirma o cadastro da venda?"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={closeModalCadastro} className="btn btn-danger">Cancelar</button>
                        <button onClick={confirmaCadastro} className="btn btn-primary">Confirmar</button>
                    </div>
                }
            >
                <></>
            </Modal>

            <Modal
                isOpen={openModalMensagem}
                label="Venda cadastrada com sucesso"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={closeModalMensagem} className="btn btn-secondary">Ok</button>
                    </div>
                }
            >
                <></>
            </Modal>

            <Modal
                isOpen={openModalMensagemQuantidade}
                label="Selecione quantidade de produto"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={closeModalMensagemQuantidade} className="btn btn-secondary">Ok</button>
                    </div>
                }
            >
                <></>
            </Modal>
        </div>
    );
}
