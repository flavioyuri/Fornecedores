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
                                <td>{indice+1}</td>
                                <td>{obj.nome}</td>
                                <td>{obj.cpf}</td>
                                <td><button className="btn btn-success" onClick={() => {selecionar(indice)}}>Selecionar</button></td>
                            </tr>
        
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Tabela;