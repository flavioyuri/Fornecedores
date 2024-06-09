import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formularo';
import Tabela from './Tabela';
import Input from './Input';
import Botao from './Botao';
import Header from './Header';

function App() {

  const fornecedor = {
    id: 0,
    nome: '',
    cnpj: 0
  }


  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [fornecedores, setFornecedor] = useState([]);
  const [objFornecedor, setObjFornecedor] = useState(fornecedor);

  useEffect(() => {
    fetch("http://localhost:8080/fornecedores")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setFornecedor(retorno_convertido))
  }, [])

  const listar = () => {
    fetch("http://localhost:8080/fornecedores")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setFornecedor(retorno_convertido))
  }

  const listarUm = (indice) => {
    fetch("http://localhost:8080/fornecedores/" + indice)
      .then(retorno => retorno.json())
      .then(retorno_convertido => setFornecedor(retorno_convertido))
  }

  const digitar = (e) => {
    setObjFornecedor({ ...objFornecedor, [e.target.name]: e.target.value })
  }


  const cadastrar = (forn) => {
    fetch('http://localhost:8080/cadastrar', {
      method: 'post',
      body: JSON.stringify(forn),
      headers: {
        'Content-type': 'application/json',
        "Accept": 'application/json',
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          setFornecedor([...fornecedores, retorno_convertido]);
          console.log(fornecedores);
          alert('Fornecedor cadastrado com sucesso');
          limparForm();
        }
      })
  }

  const limparForm = () => {
    setObjFornecedor(fornecedor);
    setBtnCadastrar(true);
  }

  const selecionarFornecedor = (indice) => {
    let temp = {
      id: indice,
      nome: "",
      cnpj: "",
    }
    setObjFornecedor(temp);
    setBtnCadastrar(false);
  }


  const apagar = () => {

    fetch('http://localhost:8080/deletar/' + objFornecedor.id, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        "Accept": 'application/json',
      }
    })
      .then(listar())
      //.then(retorno => retorno.json())
      .then(retorno_convertido => {
        alert("Removido " + objFornecedor.nome);

        let vetorTemp = [...fornecedores];

        let indice = vetorTemp.findIndex((f) => {
          return f.id === objFornecedor.id;
        });

        vetorTemp.splice(indice, 1);

        setFornecedor(vetorTemp);

        limparForm();

      })
  }

  const editar = (forn) => {
    
    let id = objFornecedor.id;
    let temp = {
      id: objFornecedor.id,
      nome: forn.nome,
      cnpj: parseInt(forn.cnpj),
    }
    fetch('http://localhost:8080/editar/' + id, {
      method: 'put',
      body: JSON.stringify(temp),
      headers: {
        'Content-type': 'application/json',
        "Accept": 'application/json',
      }
    })
      .then(listar())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          alert('Fornecedor alterado com sucesso');

          let vetorTemp = [...fornecedores];
          
          let indice = vetorTemp.findIndex((f) => {
            return f.id === id;
          });

          vetorTemp[indice] = temp;
          setFornecedor(vetorTemp);

          limparForm();
        }
      })
  }

  const [mostrarTabela, setMostraTabela] = useState(false)
  const flagMostrarTabela = () => {
    if (procurarUm === false || objFornecedor.id === '') {
      setMostraTabela(false);
      
      listar();
      setMostraTabela(true);
      
    }
    else {
      if (objFornecedor.id !== 0) {
        procurar();
        setMostraTabela(true);
      } else {
        setMostraTabela(false);
      }
    }
  }

  const onClickMostrarTabela = () => {
    setMostraTabela(!mostrarTabela);
  }

  const [procurarUm, setProcurarUm] = useState(false)
  const ProcurarUm = () => {
    setProcurarUm(!procurarUm);
  }


  const procurar = () => {
    listarUm(objFornecedor.id);
  }

  return (
    <div className="App">
      <Header text={"Formulário Fornecedores"} />
      <Formulario mostrarBtn={btnCadastrar} obj={objFornecedor} cadastrar={cadastrar} cancelar={limparForm} apagar={apagar} editar={editar} />
      <form>
        <input type="button" value={mostrarTabela ? 'Esconder tabela' : 'Mostrar tabela'} className="btn btn-warning" onClick={onClickMostrarTabela} />
        <input type="button" value="Listar Um Fornecedor" className="btn btn-warning" onClick={ProcurarUm} />
      </form>
      {
        mostrarTabela
          ?
          <Tabela vetor={fornecedores} selecionar={selecionarFornecedor} />
          :
          null
      }

      {
        procurarUm
          ?
          <form>
            <Input eventoTeclado={digitar} name={"id"} placeholder={"ID"} text={"Id"} />
            <Botao classe={"btn btn-primary"} name={"Procurar Fornecedor"} value={"Procurar Fornecedor"} onclick={flagMostrarTabela} />
            {//<input type='button' value="Procurar fornecedor" className='btn btn-primary' onClick={flagMostrarTabela} />
            }
          </form>
          :
          null
      }

    </div>
  );
}

export default App;
