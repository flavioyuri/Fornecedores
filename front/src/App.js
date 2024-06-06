import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formularo';
import Tabela from './Tabela';

function App() {

  const fornecedor = {
    id : 0,
    nome : '',
    cpf : 0
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

  const digitar = (e) => {
    setObjFornecedor({...objFornecedor, [e.target.name]:e.target.value})
  }


  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method:'post',
      body:JSON.stringify(objFornecedor),
      headers:{
        'Content-type': 'application/json',
        "Accept":'application/json',
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        setFornecedor([...fornecedores, retorno_convertido]);
        alert('Fornecedor cadastrado com sucesso');
        limparForm();
      }
    })
  }

  const limparForm = () => {
    console.log(fornecedor);
    setObjFornecedor(fornecedor);
    setBtnCadastrar(true);
  }

  const selecionarFornecedor = (indice) => {
    setObjFornecedor(fornecedores[indice]);
    setBtnCadastrar(false);
  }


  const apagar = () => {
    
    console.log(fornecedor);
    console.log(objFornecedor.id)
    fetch('http://localhost:8080/deletar/'+objFornecedor.id, {
      method:'delete',
      headers:{
        'Content-type': 'application/json',
        "Accept":'application/json',
      }
    })
    .then(listar())
    //.then(retorno => retorno.json())
    .then(retorno_convertido => {
      console.log("aqui");
      alert("Boa campeão " + objFornecedor.nome);

      let vetorTemp = [...fornecedores];

      let indice = vetorTemp.findIndex((f) => {
        return f.id === objFornecedor.id;
      });

      vetorTemp.splice(indice, 1);
      console.log(vetorTemp);

      setFornecedor(vetorTemp);

      limparForm();

    })
  }

  const editar = () => {
    fetch('http://localhost:8080/editar/'+objFornecedor.id, {
      method:'put',
      body:JSON.stringify(objFornecedor),
      headers:{
        'Content-type': 'application/json',
        "Accept":'application/json',
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        alert('Produto alterado com sucesso');

        let vetorTemp = [...fornecedores];

        let indice = vetorTemp.findIndex((f) => {
          return f.id === objFornecedor.id;
        });

        vetorTemp[indice] = objFornecedor;

        setFornecedor(vetorTemp);

        limparForm();
      }
    })
  }

  const [showElement, setShowElement] = useState(false)
  const showOrHide = () => {
    setShowElement(!showElement)
  }


  return (
    <div className="App">
      <Formulario mostrarBtn={btnCadastrar} eventoTeclado={digitar} obj={objFornecedor} cadastrar={cadastrar} cancelar={limparForm} apagar={apagar} editar={editar} showOrHide={showOrHide} showElement={showElement} fornecedores={fornecedores} selecionarFornecedor={selecionarFornecedor} />
      <input type="button" value="Listar Fornecedores"  className="btn btn-warning" onClick={showOrHide}/>
      {
            showElement
            ?
            <Tabela vetor={fornecedores} selecionar={selecionarFornecedor}  />
            :
            null
        }
    </div>
  );
}

export default App;
