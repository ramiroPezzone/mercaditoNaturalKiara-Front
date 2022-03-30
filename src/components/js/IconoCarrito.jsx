import { Link } from "react-router-dom";
import styles from '../css/IconoCarrito.module.css'

const IconoCarrito = (props) => {

    return (
        <div className={
            props.estadoCarrito
                ? `${styles.containerIcoCarritoLleno}`
                : `${styles.containerIcoCarritoVacio}`
        }>
            <Link to={'/carrito'}>
                <div className={styles.flexCarrito}>
                    <div className={
                        props.estadoCarrito
                            ? `${styles.carritoLleno}`
                            : `${styles.carritoVacio}`
                    } />
                </div>
            </Link>
        </div>
    )
}

export default IconoCarrito
