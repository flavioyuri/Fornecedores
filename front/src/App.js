import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formularo';
import Tabela from './Tabela';
import Input from './Input';

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

  const listarUm = (indice) => {
    console.log(indice);
    fetch("http://localhost:8080/fornecedores/" + indice)
    .then(retorno => retorno.json())
    .then(retorno_convertido => setFornecedor(retorno_convertido))
  }

  const digitar = (e) => {
    console.log(e)
    setObjFornecedor({...objFornecedor, [e.target.name]:e.target.value})
    console.log(objFornecedor)
  }


  const cadastrar = (forn) => {
    fetch('http://localhost:8080/cadastrar', {
      method:'post',
      body:JSON.stringify(forn),
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
    console.log(indice)
    setObjFornecedor(indice);
    console.log(objFornecedor)
    setBtnCadastrar(false);
  }


  const apagar = () => {
    
    console.log(fornecedor);
    console.log(objFornecedor.id);
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

  const editar = (forn) => {
    console.log(forn);
    console.log(objFornecedor);
    let id = objFornecedor.id;
    fetch('http://localhost:8080/editar/'+id, {
      method:'put',
      body:JSON.stringify(forn),
      headers:{
        'Content-type': 'application/json',
        "Accept":'application/json',
      }
    })
    .then(listar())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        alert('Produto alterado com sucesso');

        let vetorTemp = [...fornecedores];
        console.log(vetorTemp);

        let indice = vetorTemp.findIndex((f) => {
          return f.id === id;
        });

        console.log(indice);
        console.log(forn);

        vetorTemp[indice] = forn;

        setFornecedor(vetorTemp);

        limparForm();
      }
    })
  }

  const [mostrarTabela, setMostraTabela] = useState(false)
  const MostrarTabela = () => {
    if (procurarUm === false){
      listar();
    }
    else{
      procurar();
    }
    setMostraTabela(!mostrarTabela)
  }

  const [procurarUm, setProcurarUm] = useState(false)
  const ProcurarUm = () => {
    setProcurarUm(!procurarUm);
  }


  const procurar = () => {
    console.log("obj "); 
    console.log(objFornecedor);
    listarUm(objFornecedor.id);
  }

  return (
    <div className="App">
      <Formulario mostrarBtn={btnCadastrar} eventoTeclado={digitar} obj={objFornecedor} cadastrar={cadastrar} cancelar={limparForm} apagar={apagar} editar={editar} mostrarTabela={mostrarTabela} fornecedores={fornecedores} selecionarFornecedor={selecionarFornecedor} />
      <form>
        <input type="button" value="Listar Todos Fornecedores"  className="btn btn-warning" onClick={MostrarTabela}/>
        <input type="button" value="Listar Um Fornecedor"  className="btn btn-warning" onClick={ProcurarUm}/>
      </form>
      {
            mostrarTabela
            ?
            <Tabela vetor={fornecedores} selecionar={selecionarFornecedor}  />
            :
            null
      }

      {
        procurarUm
        ?
        <form>
          <Input eventoTeclado={digitar} name={"id"} placeholder={"ID"} text={"Id"} />
          <input type='button' value="Procurar fornecedor" className='btn btn-primary' onClick={MostrarTabela}/>
        </form>
        :
        null
      }

    </div>
  );
}

export default App;
