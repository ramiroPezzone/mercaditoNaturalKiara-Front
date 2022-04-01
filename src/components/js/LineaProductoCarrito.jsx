import React, { useState, useEffect } from 'react'
import styles from '../css/LineaProductoCarrito.module.css'

const LineaProductoCarrito = (props) => {

    const [cantidad, setCantidad] = useState(props.quantity)
    const [costoTotal, setCostoTotal] = useState(props.price * props.quantity)

    const restar = () => {
        cantidad > 1
            && setCantidad(cantidad - 1)
        costoTotal > props.price
            && props.cambioDeValoresEnMemoriaSumados(props.price, restar)
    }
    const sumar = () => {
        setCantidad(cantidad + 1)
        props.cambioDeValoresEnMemoriaSumados(props.price, sumar)
    }

    // Lógica de actualización de cantidades
    useEffect(() => {
        const productosEnMemoria = localStorage.getItem(props.id)
        const productosParseados = JSON.parse(productosEnMemoria)
        productosParseados.quantity = cantidad
        const productosModificadosAString = JSON.stringify(productosParseados)
        localStorage.setItem(props.id, productosModificadosAString)
    }, [cantidad])
    // 
    useEffect(() => {
        setCostoTotal(props.price * cantidad)
    }, [cantidad, props.price])

    const [productoEliminado, setProductoEliminado] = useState(false)

    const eliminarProducto = () => {
        localStorage.removeItem(props.id)
        setProductoEliminado(true)
        props.restarAlTotal(costoTotal)
    }

    return (
        <tr className={
            productoEliminado === false
                ? `${styles.contenedorLinea}`
                : `${styles.lineaEliminada}`
        }>
            <td className={styles.centrar}><p>{props.i + 1}</p></td>
            <td><p>{props.name}</p></td>
            <td className={styles.centrar}>
                <div className={styles.containerGralCantidad}>
                    <button
                        onClick={restar}
                        disabled=
                        {
                            productoEliminado === false
                                ? false
                                : true
                        }
                    >
                        -
                    </button>
                    <p>{cantidad}</p>
                    <button
                        onClick={sumar}
                        disabled=
                        {
                            productoEliminado === false
                                ? false
                                : true
                        }
                    >
                        +
                    </button>
                </div>
            </td>
            <td className={styles.centrar}><p>${props.price}</p></td>
            <td className={styles.centrar}><p>${costoTotal}</p></td>
            <td
                className={styles.centrar}
            >
                <button
                    disabled={productoEliminado
                        && true}
                    onClick={eliminarProducto}
                    className={styles.btnEliminar}
                ><div
                        className={
                            !productoEliminado
                                ? `${styles.cruzRoja}`
                                : `${styles.cruzGris}`

                        }
                    />
                </button>
            </td>
        </tr>
    )
}

export default LineaProductoCarrito
