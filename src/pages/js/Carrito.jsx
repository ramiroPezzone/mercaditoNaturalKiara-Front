import { useEffect, useState } from 'react'
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import LineaProductoCarrito from '../../components/js/LineaProductoCarrito';
import styles from '../css/Carrito.module.css'

export const Carrito = () => {

  useEffect(() => {
    document.title = `Tu carrito`;
  });

  const [productosEnMemoria, setProductosEnMemoria] = useState([])
  const prodsStr = Object.values(localStorage)
  const parseoProds = prodsStr.map(prod => {
    let prodAObj = JSON.parse(prod)
    return prodAObj
  })

  useEffect(() => {
    setProductosEnMemoria(parseoProds)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Almacenando en la variable "valores" lo que viene del localStorage
  const [valores, setValores] = useState(0)

  useEffect(() => {
    setValores(productosEnMemoria.map((prod) => (
      prod.unity.includes("ramo") ? (prod.price * prod.quantity) / 100 : prod.price * prod.quantity
    )))
  }, [productosEnMemoria])
  // 

  const [valoresEnMemoriaSumados, setValoresEnMemoriaSumados] = useState([])

  // Sumando los valores que vienen del Array del LocalStorage
  useEffect(() => {
    valores !== 0
      && setValoresEnMemoriaSumados(valores.reduce((prevVal, currVal) => prevVal + currVal, 0))
  }, [valores])
  // 


  // Actualizando los valores sumados de acuerdo al cambio en las cantidades en el carrito
  const cambioDeValoresEnMemoriaSumados = (precioUnit, operacion) => {
    operacion.name === 'sumar'
      && setValoresEnMemoriaSumados(valoresEnMemoriaSumados + precioUnit)
    operacion.name === 'restar'
      && setValoresEnMemoriaSumados(valoresEnMemoriaSumados - precioUnit)
  }
  // 

  const restarAlTotal = (restarAlTotal) => {
    setValoresEnMemoriaSumados(valoresEnMemoriaSumados - restarAlTotal)
  }

  const [confirmacionDePedido, setConfirmacionDePedido] = useState(false)

  useEffect(() => {
    setConfirmacionDePedido(confirmacionDePedido)
  }, [confirmacionDePedido])

  // localStorage.clear()
  if (productosEnMemoria.length === 0) {
    return (
      <div className={styles.containerCarritoVacio}>
        <p>Aún no colocaste productos en el carrito</p>
        <div className={styles.containerImagenes}>
          <div className={styles.imgCarrito} />
          <div className={styles.imgPiso} />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.containerGralCarrito}>
      <div className={styles.containerBtnVolverAlCarrito}>
        <button className={styles.btnVolverAlCarrito}>
          <Link to='/productos'>
            🢦 Volver a productos
          </Link>
        </button>
      </div>

      <div className={styles.containerTituloYSubtitulo}>
        <h2 className={styles.tituloCarrito}>Tu carrito</h2>
        <h3 className={styles.subtituloCarrito}>Por favor, corroborá tu pedido y confirmalo</h3>
      </div>

      <div className={styles.containerTabla}>
        <Table striped bordered hover size="sm" className={styles.tablaCarrito}>
          <thead>
            <tr>
              <th className={styles.centrar}>#</th>
              <th>Producto</th>
              <th className={styles.centrar}>Cantidad</th>
              <th className={styles.centrar}>Unidad</th>
              <th className={`${styles.centrar} ${styles.celdaSizeFixed}`}>Precio Unitario</th>
              <th className={styles.centrar}>Total</th>
              <th className={styles.centrar}>Eliminar</th>
            </tr>
          </thead>
          <tbody>

            {
              productosEnMemoria.map((prod, i) => (
                <LineaProductoCarrito
                  key={prod.id}
                  name={prod.name}
                  price={prod.price}
                  quantity={prod.quantity}
                  unity={prod.unity}
                  id={prod.id}
                  i={i}
                  cambioDeValoresEnMemoriaSumados={cambioDeValoresEnMemoriaSumados}
                  pedidoConfirmado={confirmacionDePedido}
                  restarAlTotal={restarAlTotal}
                />
              ))
            }
          </tbody>
        </Table>
      </div>

      <div className={styles.containerGralTotal}>
        <div className={styles.containerTotal}>
          <p>Total a abonar: $ {valoresEnMemoriaSumados}</p>
          <p className={styles.italic}>* Costo de envío a coordinar</p>
        </div>
      </div>
      <div className={styles.containerBtn}>
        {
          valoresEnMemoriaSumados !== 0
            ? (<Link
              to={'/confirmacionPedido'}
              className={styles.btnCheck}
              title='Confirmación de pedido'
            >
              Ok
            </Link>)
            : (<button
              to={'/confirmacionPedido'}
              className={styles.btnCheck}
              title='Confirmación de pedido'
              disabled
            >
              Ok
            </button>)
        }
      </div>
    </div>
  )
}
