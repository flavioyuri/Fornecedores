import Input from "./Input";
import { useEffect, useState } from 'react';


function Formulario({mostrarBtn, eventoTeclado, obj,  cadastrar, cancelar, apagar, editar,  showOrHide, showElement, fornecedores, selecionarFornecedor}){

    
    {/*const [fornecedor, setFornecedor] = useState({nome:'', cpf:''});
    const digitar = (e) => {
        setFornecedor({...fornecedor, [e.target.name]:e.target.value});
      };*/}
    return(
        <form>
        <input type="text" value={obj.nome} onChange={eventoTeclado} name="nome" placeholder="Nome" className="form-control" />
        <input type="text" value={obj.cpf} onChange={eventoTeclado} name='cpf' placeholder="CPF" className="form-control" />

        {
            mostrarBtn 
            ? 
            <div>
                <input type="button" value="Cadastrar" onClick={cadastrar} className="btn btn-primary"/>
                {/*<input type="button" value="Tabela"  className="btn btn-warning" onClick={showOrHide}/>*/}
            </div>
            :
            <div>
                <input type="button" value="Apagar"  className="btn btn-danger" onClick={apagar} />
                <input type="button" value="Editar"  className="btn btn-warning" onClick={editar}/>
                <input type="button" value="Cancelar"  className="btn btn-secondary" onClick={cancelar}/>
                {/*<input type="button" value="Tabela"  className="btn btn-warning" onClick={showOrHide}/>*/}
            </div>
        }

        
        </form>
    )
}

export default Formulario;