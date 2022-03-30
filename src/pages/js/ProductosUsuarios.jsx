import { useState, useEffect } from 'react'
import axios from "axios";
import styles from '../css/ProductosUsuarios.module.css'
import stylesCarrito from "../../components/css/IconoCarrito.module.css";
import { CardProductoUsuario } from '../../components/js/CardProductoUsuario';
import IconoCarrito from '../../components/js/IconoCarrito';
import { FlexContainer } from '../../components/js/FlexContainer';
import { Loading } from '../../components/js/Loading';
const URI = require('../../URIs')

export const ProductosUsuarios = () => {

    const URIImage = URI.imagenes

    useEffect(() => {
        document.title = `Todo rico y sano`;
    });

    const [productos, setProductos] = useState([]);

    const [cargaCompleta, setCargaCompleta] = useState(false)


    useEffect(() => {
        (async () => {
            const res = await axios.get(URI.productosUsuarios);
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
    })

    if (productos.length === 0 && cargaCompleta === false) {
        return (
            <div className={styles.containerGraloading}>
                <Loading />
            </div>)
    }

    if (productos.length === 0 && cargaCompleta === true) {
        return (
            <div className={styles.containerGraloading}>
                <h3>Aún no hay productos cargados</h3>
            </div>)
    }



    return (
        <div className={styles.containerProductosUsuarios}>
            <h2>Todo lo que buscás</h2>
            <FlexContainer>
                {
                    productos.map((prod) => (
                        <CardProductoUsuario
                            key={prod._id}
                            id={prod._id}
                            name={prod.name}
                            img={`${URIImage}${prod.image}`}
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
        </div>
    )
}
