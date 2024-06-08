import Botao from "./Botao";
import Input from "./Input";
import { useState } from 'react';


function Formulario({ mostrarBtn, obj, cadastrar, cancelar, apagar, editar }) {

    const fornecedor2 = {
        id: 0,
        nome: '',
        cnpj: 0
    }

    const [forn, setFornecedor2] = useState(fornecedor2);
    const digitarFormulario = (e) => {
        setFornecedor2({ ...forn, [e.target.name]: e.target.value });
    };

    const limparFormCadastro = () => {
        setFornecedor2(forn);
    }


    const cadastro = () => {
        cadastrar(forn);
        limparFormCadastro();
    }

    const editarForn = () => {
        editar({ id: obj.id, ...forn });
    }


    return (
        <form>
            <Input eventoTeclado={digitarFormulario} name="nome" placeholder="Nome" text="Nome" />
            <Input eventoTeclado={digitarFormulario} name="cnpj" placeholder="CNPJ" text="cnpj" />
            {/*<input type="text" value={obj.nome} onChange={eventoTeclado} name="nome" placeholder="Nome" className="form-control" />*/}
            {/*<input type="text" value={obj.cpf} onChange={eventoTeclado} name='cpf' placeholder="CPF" className="form-control" />*/}

            {
                mostrarBtn
                    ?
                    <div>
                        <Botao classe={"btn btn-primary"} name={"Cadastrar"} value={"Cadastrar"} onclick={cadastro} />
                        {/*<input type="button" value="Cadastrar" onClick={cadastro} className="btn btn-primary" />
                        <input type="button" value="Tabela"  className="btn btn-warning" onClick={showOrHide}/>*/}
                    </div>
                    :
                    <div>
                        <Botao classe={"btn btn-danger"} name={"Apagar"} value={"Apagar"} onclick={apagar} />
                        <Botao classe={"btn btn-warning"} name={"Editar"} value={"Editar"} onclick={editarForn} />
                        <Botao classe={"btn btn-secondary"} name={"Cancelar"} value={"Cancelar"} onclick={cancelar} />
                        {/*<input type="button" value="Apagar" className="btn btn-danger" onClick={apagar} />
                        <input type="button" value="Editar" className="btn btn-warning" onClick={editarForn} />
                        <input type="button" value="Cancelar" className="btn btn-secondary" onClick={cancelar} />
                        <input type="button" value="Tabela"  className="btn btn-warning" onClick={showOrHide}/>*/}
                    </div>
            }


        </form>
    )
}

export default Formulario;