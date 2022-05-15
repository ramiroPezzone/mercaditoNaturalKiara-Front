import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from '../css/OneCategory.module.css'
import stylesCarrito from '../../components/css/IconoCarrito.module.css'
import { CardProductoUsuario } from '../../components/js/CardProductoUsuario';
import IconoCarrito from "../../components/js/IconoCarrito";
import { FlexContainer } from '../../components/js/FlexContainer';
import { Loading } from '../../components/js/Loading';
import ModalProducto from '../../components/js/ModalProducto';
const URI = require('../../URIs')

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
            setCargaCompleta(true)
        })()
    }, [param])

    const [productosEnMemoria, setProductosEnMemoria] = useState(false)
    const [carritoActivo, setCarritoActivo] = useState(false)

    useEffect(() => {
        const revisarMemoria = localStorage
        revisarMemoria.length !== 0
            ? setProductosEnMemoria(true)
            : setProductosEnMemoria(false)
    }, [])

    const [productosEnCarrito, setProductosEnCarrito] = useState([])
    useEffect(() => {
        productosEnCarrito.length !== 0 || productosEnMemoria
            ? setCarritoActivo(true)
            : setCarritoActivo(false)
    }, [productosEnCarrito, productosEnMemoria])



    const cambioDeEstadoCarrito = (valor) => {
        if (valor === 0) {
            setProductosEnCarrito(productosEnCarrito.slice(1))
        }
        if (valor === 1) {
            setProductosEnCarrito([...productosEnCarrito, 1])
        }
    }

        // Mostrar detalles
        const [detalles, setDetalles] = useState({})
        const mostrarDetalles = ({ id, name, description, image, price, unity }) => {
            setDetalles({ id, name, description, image, price, unity })
        }
        const ocultarModal = () => {
            setDetalles({})
        }
        // 
    

    if (prodsDeCat.length === 0 && cargaCompleta === false) {
        return (
            <div className={styles.containerOneCategory}>
                <div className={styles.containerGraloading}>
                    <Loading />
                </div>
            </div>
        )
    }

    if (prodsDeCat.length === 0 && cargaCompleta === true) {
        return (
            <div className={styles.containerOneCategory}>
                <div className={styles.containerGraloading}>
                    <div className={styles.containerOneCategory}>
                        <h5 className={styles.tituloOneCategory}>Categoría: {categorySelected}</h5>
                        <h5 className={styles.noHayProductos}>No hay productos disponibles para esta categoría</h5>
                    </div>
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
                            img={prod.image}
                            description={prod.description}
                            price={prod.price}
                            unity={prod.unity}
                            categorys={prod.categorys}
                            cambioDeEstadoCarrito={cambioDeEstadoCarrito}
                            mostrarDetalles={mostrarDetalles}
                        />
                    ))
                }
            </FlexContainer>
            <IconoCarrito
                estadoCarrito={carritoActivo}
                className={stylesCarrito.iconoCarrito}
            />
            <ModalProducto
                detalles={detalles}
                ocultarModal={ocultarModal}
            />
        </div>
    )
}
