function Input({text, name, placeholder, eventoTeclado, value}){
    return (
        <div>
            <label>{text}</label>
            <input type="text" name={name} placeholder={placeholder} onChange={eventoTeclado} value={value} className="form-control" />
        </div>

    )
}

export default Input;