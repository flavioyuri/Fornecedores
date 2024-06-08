import Botao from "./Botao";
function Tabela({vetor, selecionar, tabela}){
    return(
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vetor.map((obj, indice) => (
                            <tr key={indice}>
                                <td>{obj.id}</td>
                                <td>{obj.nome}</td>
                                <td>{obj.cpf}</td>
                                <td><Botao name={"Selecionar"} onclick={() => {selecionar(obj.id)}} text={"Selecionar"} value={"Selecionar"} classe="btn btn-success" /></td>
                            </tr>
        
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Tabela;