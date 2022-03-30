import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from '../css/OneCategory.module.css'
import stylesCarrito from '../../components/css/IconoCarrito.module.css'
import { CardProductoUsuario } from '../../components/js/CardProductoUsuario';
import IconoCarrito from "../../components/js/IconoCarrito";
import { FlexContainer } from '../../components/js/FlexContainer';
import { Loading } from '../../components/js/Loading';
const URI = require('../../URIs')
const URIImage = URI.imagenes

export const OneCategory = () => {

    const [categorySelected, setCategorySelected] = useState()

    const param = useParams()

    useEffect(() => {
        setCategorySelected(param.cat);
    }, [param])

    const [prodsDeCat, setProdsDeCat] = useState([])

    const [cargaCompleta, setCargaCompleta] = useState(false)

    useEffect(() => {
        (async () => {
            const categoryRes = await axios.get(`${URI.productosUsuarios}/${param.cat}`)
            setProdsDeCat(categoryRes.data)
        })()
        setCargaCompleta(true)
    }, [param])

    const [productosEnMemoria, setProductosEnMemoria] = useState(false)
    const [carritoActivo, setCarritoActivo] = useState(false)

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

    const [productosEnCarrito, setProductosEnCarrito] = useState([])


    const cambioDeEstadoCarrito = (valor) => {
        if (valor === 0) {
            setProductosEnCarrito(productosEnCarrito.slice(1))
        }
        if (valor === 1) {
            setProductosEnCarrito([...productosEnCarrito, 1])
        }
    }


    if (prodsDeCat.length === 0 && cargaCompleta === false) {
        return (
            <div className={styles.containerGraloading}>
                <Loading />
            </div>)
    }

    if (prodsDeCat.length === 0 && cargaCompleta === true) {
        return (
            <div className={styles.containerGraloading}>
                <div className={styles.containerOneCategory}>
                    <h5 className={styles.tituloOneCategory}>Categoría: {categorySelected}</h5>
                    <h5 className={styles.noHayProductos}>No hay productos disponibles para esta categoría</h5>
                </div>
            </div>
        )
    }


    return (
        <div className={styles.containerOneCategory}>
            <h5 className={styles.tituloOneCategory}>Categoría: {categorySelected}</h5>
            <FlexContainer>
                {
                    prodsDeCat.map((prod) => (
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
