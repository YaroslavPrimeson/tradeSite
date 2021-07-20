const Input = ({placeholder, type, id, children, className, change, header, name, value, onKeyPress, disabled}) => {

    return (

        <input
            id={id}
            type={type}
            placeholder={placeholder}
            name={name}
            className={className}
            value={value} onKeyPress={onKeyPress}
            disabled={disabled}
            onChange={(e) => change(e, header)}
        />
    )
}
export default Input;