
function Alert({ clase, mensaje, children }) {
    return (
        <div className={clase}>
            {children}
            <strong>{mensaje}</strong>
        </div>
    )
}

export default Alert