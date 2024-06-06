import Input from "./Input";
import { useEffect, useState } from 'react';


function Formulario({mostrarBtn, eventoTeclado, obj,  cadastrar, cancelar, apagar, editar,  showOrHide, showElement, fornecedores, selecionarFornecedor}){

    const fornecedor2 = {
        id : 0,
        nome : '',
        cpf : 0
      }
    
    const [forn, setFornecedor2] = useState(fornecedor2);
    const digitar2 = (e) => {
        setFornecedor2({...forn, [e.target.name]:e.target.value});
      };

    const cadastro = () => {
        cadastrar(forn);
    }

    const editarForn = () => {
        editar(forn);
    }

    const selecionarFornecedor2 = (indice) => {
        setFornecedor2(forn[indice]);
    }
    
    return(
        <form>
            <Input eventoTeclado={digitar2} name="nome" placeholder="Nome" text="Nome" />
            <Input eventoTeclado={digitar2} name="cpf" placeholder="CPF" text="cpf" />
        {/*<input type="text" value={obj.nome} onChange={eventoTeclado} name="nome" placeholder="Nome" className="form-control" />*/}
        {/*<input type="text" value={obj.cpf} onChange={eventoTeclado} name='cpf' placeholder="CPF" className="form-control" />*/}

        {
            mostrarBtn 
            ? 
            <div>
                <input type="button" value="Cadastrar" onClick={cadastro} className="btn btn-primary"/>
                {/*<input type="button" value="Tabela"  className="btn btn-warning" onClick={showOrHide}/>*/}
            </div>
            :
            <div>
                <input type="button" value="Apagar"  className="btn btn-danger" onClick={apagar} />
                <input type="button" value="Editar"  className="btn btn-warning" onClick={editarForn}/>
                <input type="button" value="Cancelar"  className="btn btn-secondary" onClick={cancelar}/>
                {/*<input type="button" value="Tabela"  className="btn btn-warning" onClick={showOrHide}/>*/}
            </div>
        }

        
        </form>
    )
}

export default Formulario;