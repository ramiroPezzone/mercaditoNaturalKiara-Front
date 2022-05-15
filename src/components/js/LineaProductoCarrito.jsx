import React, { useState, useEffect } from 'react'
import styles from '../css/LineaProductoCarrito.module.css'

const LineaProductoCarrito = (props) => {

    const [cantidad, setCantidad] = useState(props.quantity)
    const [costoTotal, setCostoTotal] = useState(props.unity.includes("ramo") ? (props.price * props.quantity) / 100 : props.price * props.quantity)


    const unityParsed = props.unity.toLowerCase()
    const seteadorDeSteps = () => {
        if (unityParsed.includes("gramo")) {
            return 100
        } else {
            return 1
        }
    }

    const restar = () => {
        cantidad > 1
            && setCantidad(cantidad - seteadorDeSteps())
        costoTotal > props.price
            && props.cambioDeValoresEnMemoriaSumados(props.price, restar)
    }
    const sumar = () => {
        setCantidad(cantidad + seteadorDeSteps())
        props.cambioDeValoresEnMemoriaSumados(props.price, sumar)
    }

    // Lógica de actualización de cantidades
    useEffect(() => {
        const productosEnMemoria = localStorage.getItem(props.id)
        const productosParseados = JSON.parse(productosEnMemoria)
        productosParseados.quantity = cantidad
        const productosModificadosAString = JSON.stringify(productosParseados)
        localStorage.setItem(props.id, productosModificadosAString)
    }, [cantidad, props.id])
    // 
    useEffect(() => {
        setCostoTotal(props.unity.includes("ramo") ? (props.price * cantidad) / 100 : props.price * cantidad)
    }, [cantidad, props.price, props.unity])

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
            <td className={styles.centrar}><p>{props.unity}</p></td>
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
