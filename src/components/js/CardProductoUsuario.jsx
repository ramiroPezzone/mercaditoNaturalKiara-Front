import { useState, useEffect } from 'react'
import { Card } from "react-bootstrap";
import styles from '../css/CardProductoUsuario.module.css'

export const CardProductoUsuario = (props) => {

    // Controles de botones sumar y restar y efecto de input disabled
    const [cantidad, setCantidad] = useState(0)
    const [cantidadEnMemoria, setCantidadEnMemoria] = useState(0)
    const [classDisabled, setClassDisabled] = useState(false)
    const [cantidadModificada, setCantidadModificada] = useState(false)

    useEffect(() => {
        if (localStorage.getItem(props.id)) {
            const prodEnLocalStorage = localStorage.getItem(props.id)
            const prodAJson = JSON.parse(prodEnLocalStorage)
            var cantidadProds = prodAJson.quantity
            setCantidad(cantidadProds)
            setCantidadEnMemoria(cantidadProds)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    // localStorage.clear()

    // Sumar y restar cantidades
    const restar = () => {
        cantidad > 0
            && setCantidad(cantidad - 1)
        setCantidadModificada(true)
        if (cantidad === 1) {
            localStorage.removeItem(props.id)
            setModificacionEstadoCarrito(false)
            setProductoAgregado(false)
            setCantidadModificada(false)
            setCantidad(0)
            setCantidadEnMemoria(0)
            props.cambioDeEstadoCarrito(0)
        }
    }

    const sumar = () => {
        setCantidad(cantidad + 1)
        setCantidadModificada(true)
    }

    const modificarCantidad = (e) => {
        var cantIngresada = e.target.value
        setCantidad(cantIngresada)
    }
    // 

    useEffect(() => {
        cantidad > 0
            && setClassDisabled(false)
        cantidad === 0
            && setClassDisabled(true)
    }, [cantidad])
    // 

    // Lógica para agregado de productos al carrito
    const [productoAAgregar, setProductoAAgregar] = useState({})
    const [productoAgregado, setProductoAgregado] = useState(false)
    const [modificacionEstadoCarrito, setModificacionEstadoCarrito] = useState(false)

    const agregar = () => {
        var prodAAgregar = {
            id: props.id,
            name: props.name,
            price: props.price,
            quantity: cantidad
        }
        setProductoAAgregar(prodAAgregar)
        setCantidadEnMemoria(cantidad)
        setProductoAgregado(true)
        setCantidadModificada(false)
        setModificacionEstadoCarrito(true)
        props.cambioDeEstadoCarrito(1)
    }
    useEffect(() => {
        if (cantidad !== 0 && productoAgregado === true) {
            localStorage.setItem(props.id, JSON.stringify(productoAAgregar))
        }
    }, [modificacionEstadoCarrito, props.id, productoAAgregar, cantidad]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        productoAgregado
            && props.cambioDeEstadoCarrito()
    }, [productoAgregado, props])

    const stylesImg = {
        backgroundImage: `url("${props.img}")`
    }

    return (
        <Card
            className={
                productoAgregado || cantidadEnMemoria
                    ? `${styles.cardContainer} ${styles.cardACtive}`
                    : `${styles.cardContainer}`
            }>
            <a href={props.img} target="_blank" rel="noreferrer noopener">
                <div className={styles.imgCard}
                    style={stylesImg}>
                </div>
            </a>
            <Card.Body className={styles.containerCard}>
                <Card.Title className={styles.tituloProd}>{props.name}</Card.Title>
                <hr />
                <Card.Text>
                    {props.description}
                </Card.Text>
                <div>
                    {
                        props.categorys.map(cat => (
                            <p key={cat._id}>-{cat.value}</p>
                        ))
                    }
                </div>
                <Card.Text>
                    $ {props.price}
                </Card.Text>
            </Card.Body>
            <div className={styles.lineaDivisoraCardConCarrito} />
            <p className={styles.quiero}>Quiero</p>
            <div className={styles.containerSumarAlCarrito}>
                <button
                    className={styles.restar}
                    onClick={restar}
                >
                    -
                </button>
                <input
                    className={
                        classDisabled
                            ? `${styles.inputDisabled}`
                            : `${styles.cantidadSeleccionada}`
                    }
                    type="number"
                    value={cantidad}
                    onChange={modificarCantidad}
                />
                <button
                    className={styles.sumar}
                    onClick={sumar}
                >
                    +
                </button>
            </div>

            {/* BTN AGREGAR A PEDIDO */}
            <button
                className={styles.btnAgregar}
                disabled={
                    cantidadModificada === true && cantidad > 0
                        ? false
                        : true
                }
                onClick={agregar}
            >
                Agregar / Modificar
            </button>
            {/*  */}

            {/* INFO CARRITO */}
            <div
                className={
                    productoAgregado || cantidadEnMemoria
                        ? `${styles.containerInfoCarrito}`
                        : `${styles.sinProductoEnCarrito}`
                }
            >
                <p>En carrito: {cantidadEnMemoria} {props.unity}</p>
            </div>
            {/*  */}
        </Card >
    )
}
