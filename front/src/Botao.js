function Botao({text, name, value, onclick, classe="btn btn-primary"}){
    return (
        <div>
            <input type="button" name={name} value={value} onClick={onclick} className={classe} />
        </div>
    )
}

export default Botao;