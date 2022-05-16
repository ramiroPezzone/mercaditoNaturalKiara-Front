import { useState, useEffect } from 'react'
import axios from "axios";
import styles from '../css/ProductosUsuarios.module.css'
import stylesCarrito from "../../components/css/IconoCarrito.module.css";
import { CardProductoUsuario } from '../../components/js/CardProductoUsuario';
import IconoCarrito from '../../components/js/IconoCarrito';
import { FlexContainer } from '../../components/js/FlexContainer';
import { Loading } from '../../components/js/Loading';
import BtnTop from '../../components/js/BtnTop';
import SearchBar from '../../components/js/SearchBar';
import ModalProducto from '../../components/js/ModalProducto';
import BtnCompartir from '../../components/js/BtnCompartir';
const URI = require('../../URIs')

export const ProductosUsuarios = () => {

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
    }, [productosEnCarrito, productosEnMemoria])

    // Search logic

    const [search, setSearch] = useState("")

    const searchParams = (e) => {
        setSearch(e.target.value)
    }
    //

    // Mostrar detalles
    const [detalles, setDetalles] = useState({})
    const mostrarDetalles = ({ id, name, description, image, price, unity }) => {
        setDetalles({ id, name, description, image, price, unity })
    }
    const ocultarModal = () => {
        setDetalles({})
    }
    // 

    // Comienzo de renderizaciones
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
                    <h3>Aún no hay productos cargados</h3>
                </div>
            </div>
        )
    }
localStorage.clear()
    return (
        <>
            <BtnCompartir
                url={"https://mercadito-natutal-kiara-v1-front.vercel.app/"}
            />
            <div className={styles.containerProductosUsuarios}>
                <div className={styles.containerProductosUsuarios}>
                    <h2>Kiara</h2>
                    <h3>Tu mercadito Natural</h3>
                    <h4>Nos especializamos en productos para celíacos</h4>

                    <SearchBar searchParams={searchParams} />

                    <FlexContainer
                        className={styles.flexContainerCards}>
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
                                    oferta={prod.oferta}
                                    cambioDeEstadoCarrito={cambioDeEstadoCarrito}
                                    className={styles.cardProducto}
                                    search={search}
                                    mostrarDetalles={mostrarDetalles}
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
                <ModalProducto
                    detalles={detalles}
                    ocultarModal={ocultarModal}
                />
            </div>
        </>
    )
}
