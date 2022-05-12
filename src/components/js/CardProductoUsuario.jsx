import { useState, useEffect } from 'react'
import { Card } from "react-bootstrap";
import styles from '../css/CardProductoUsuario.module.css'

export const CardProductoUsuario = (props) => {

    // Controles de botones sumar y restar y efecto de input disabled
    const [cantidad, setCantidad] = useState(0)
    const [cantidadEnMemoria, setCantidadEnMemoria] = useState(0)
    const [classDisabled, setClassDisabled] = useState(false)
    const [cantidadModificada, setCantidadModificada] = useState(false)
    const [infoHidden, setInfoHidden] = useState(true)

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

    const showInfo = () => {
        setInfoHidden(!infoHidden)
    }

    // Variables de búsqueda
    let search = props.search.toLowerCase().trim()
    let name = props.name.toLowerCase().trim()

    const [searchSinAcentos, setSearchSinAcentos] = useState("")
    const [nameSinAcentos, setNameSinAcentos] = useState("")

    // Name sin acentos
    useEffect(() => {
        const reemplazarAcentosEnName = (cadena) => {
            var chars = {
                "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u",
                "à": "a", "è": "e", "ì": "i", "ò": "o", "ù": "u", "ñ": "n",
                "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U",
                "À": "A", "È": "E", "Ì": "I", "Ò": "O", "Ù": "U", "Ñ": "N"
            }
            var expr = /[áàéèíìóòúùñ]/ig;
            var res = cadena.replace(expr, function (e) { return chars[e] });
            setNameSinAcentos(res)
        }
        reemplazarAcentosEnName(name)
    }, [name])

    // Search sin acentos
    useEffect(() => {
        const reemplazarAcentosEnSearch = (cadena) => {
            var chars = {
                "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u",
                "à": "a", "è": "e", "ì": "i", "ò": "o", "ù": "u", "ñ": "n",
                "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U",
                "À": "A", "È": "E", "Ì": "I", "Ò": "O", "Ù": "U", "Ñ": "N"
            }
            var expr = /[áàéèíìóòúùñ]/ig;
            var res = cadena.replace(expr, function (e) { return chars[e] });
            setSearchSinAcentos(res)
        }
        reemplazarAcentosEnSearch(search);
    }, [search])
    // 

    return (
        <div className={
            nameSinAcentos.includes(searchSinAcentos)
                ? `${styles.generalContainer}`
                : `${styles.generalContainerHidden}`
        }>
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

                <div className={styles.capaSuperior}>
                    <div className={styles.containerTituloProd}>
                        <h4 className={styles.tituloProd}>
                            {props.name}
                        </h4>
                    </div>
                    <Card.Text className={styles.price}>
                        $ {props.price}
                    </Card.Text>

                    <div className={styles.containerSowMore}>
                        <p>{
                            infoHidden
                                ? "Ver mas"
                                : "Ocultar"
                        }</p>
                        <button className={
                            !infoHidden
                                ? styles.btnShowMoreDown
                                : styles.btnShowMoreUp
                        } onClick={showInfo} />
                    </div>

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
                </div>
                {/*  */}
            </Card >
            <div
                className=
                {
                    infoHidden === false
                        ? styles.showInfo
                        : styles.hiddeInfo
                }
            >
                <Card.Body className={styles.containerCard}>

                    <h4 className={styles.tituloHidden}>
                        {props.name}
                    </h4>

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
                </Card.Body>
            </div>
        </div >
    )
}
