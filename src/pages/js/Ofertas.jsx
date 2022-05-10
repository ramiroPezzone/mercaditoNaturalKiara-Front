import React, { useState, useEffect } from 'react'
import BtnTop from '../../components/js/BtnTop'
import { CardProductoUsuario } from '../../components/js/CardProductoUsuario'
import { FlexContainer } from '../../components/js/FlexContainer'
import IconoCarrito from '../../components/js/IconoCarrito'
import { Loading } from '../../components/js/Loading'
import styles from '../css/ProductosUsuarios.module.css'
import stylesCarrito from "../../components/css/IconoCarrito.module.css";
const axios = require('axios')
const URI = require('../../URIs')

const Ofertas = () => {
    useEffect(() => {
        document.title = `Todo rico y sano`;
    });

    const [productos, setProductos] = useState([]);

    const [cargaCompleta, setCargaCompleta] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await axios.get(URI.ofertas);
            setProductos(res.data);
            setCargaCompleta(true)
        })();
    }, []);

    const [productosEnMemoria, setProductosEnMemoria] = useState(false)
    const [carritoActivo, setCarritoActivo] = useState(false)

    const [productosEnCarrito, setProductosEnCarrito] = useState([])


    const cambioDeEstadoCarrito = (valor) => {
        if (valor === 0) {
            setProductosEnCarrito(productosEnCarrito.slice(1))
        }
        if (valor === 1) {
            setProductosEnCarrito([...productosEnCarrito, 1])
        }
    }

    useEffect(() => {
        const revisarMemoria = localStorage
        revisarMemoria.length !== 0
            ? setProductosEnMemoria(true)
            : setProductosEnMemoria(false)
    }, [])

    useEffect(() => {
        productosEnCarrito.length !== 0 || productosEnMemoria
            ? setCarritoActivo(true)
            : setCarritoActivo(false)
    }, [productosEnCarrito, productosEnMemoria])

    if (productos.length === 0 && cargaCompleta === false) {
        return (
            <div className={styles.containerProductosUsuarios}>
                <div className={styles.containerGraloading}>
                    <Loading />
                </div>
            </div>
        )
    }

    if (productos.length === 0 && cargaCompleta === true) {
        return (
            <div className={styles.containerProductosUsuarios}>
                <div className={styles.containerGraloading}>
                    <h3>Hoy no tenemos productos en oferta, pero volvé pronto a revisar que estamos trabajando para brindarles las mejores!</h3>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.containerProductosUsuarios}>
            <div className={styles.containerProductosUsuarios}>
                <h2>Kiara</h2>
                <h3>Tu mercadito Natural</h3>
                <h3>Productos en oferta!</h3>
                <FlexContainer>
                    {
                        productos.map((prod) => (
                            <CardProductoUsuario
                                key={prod._id}
                                id={prod._id}
                                name={prod.name}
                                img={prod.image}
                                description={prod.description}
                                price={prod.price}
                                unity={prod.unity}
                                categorys={prod.categorys}
                                cambioDeEstadoCarrito={cambioDeEstadoCarrito}
                            />
                        ))
                    }
                </FlexContainer>
                <IconoCarrito
                    estadoCarrito={carritoActivo}
                    className={stylesCarrito.iconoCarrito}
                />
                <BtnTop />
            </div>
        </div>

    )
}

export default Ofertas