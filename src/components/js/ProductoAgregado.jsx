import styles from '../css/ProductoAgregado.module.css'
const ProductoAgregado = (props) => {

    const avisoDeProductoAgregado = () => props.avisoDeProductoAgreagado()

    return (
        <div className={
            props.oculto === false
            ? `${styles.containerGralProductoAgregadoOculto}`
            : `${styles.containerGralProductoAgregado}`
        }
        >
            <div className={styles.containerVentanaProductoAgregado}>
                <div className={styles.check}/>
                <p>Producto agregado satisfactoriamente</p>
                <button onClick={avisoDeProductoAgregado}>Ok</button>
                <div className={styles.containerBarraTemporal}/>
            </div>
        </div>
    )
}

export default ProductoAgregado
