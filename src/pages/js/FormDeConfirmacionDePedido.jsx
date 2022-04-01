import React, { useEffect, useState } from 'react'
import styles from '../css/FormDeConfirmacionDePedido.module.css'
import { Link } from "react-router-dom";

export const FormDeConfirmacionDePedido = (props) => {
  const URIWhatsapp = 'https://api.whatsapp.com/send/'
  const numTel = '?phone=5493424293143'

  const saltoDeLinea = '%0A%0A'

  const lineaPunteada = '------------------------------'

  const valorInicial = {
    nameConf: '',
    addresConf: '',
    observationConf: ''
  }

  const [inputsFormConf, setInputFormConf] = useState(valorInicial)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFormConf({ ...inputsFormConf, [name]: value })
  }

  const [productosEnMemoria, setProductosEnMemoria] = useState([])
  const prodsStr = Object.values(localStorage)
  const parseoProds = prodsStr.map(prod => {
    let prodAObj = JSON.parse(prod)
    return prodAObj
  })

  useEffect(() => {
    setProductosEnMemoria(parseoProds)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const subTotales = productosEnMemoria.map((prod) => (
    parseInt((`${prod.price * prod.quantity}`))
  ))

  const total = subTotales.reduce((prevVal, currVal) => prevVal + currVal, 0)

  const productos = productosEnMemoria.map((prod) => (
    (`${prod.name} x ${prod.quantity} ($${prod.price} c/u) = $${prod.price * prod.quantity}`)
  ))

  const productosConSalto = productos.join('\n\n')
  const productosParaURL = encodeURIComponent(productosConSalto)
  const text = `Hola, mi nombre es ${inputsFormConf.nameConf} y quisiera hacer el siguiente pedido:`
  const dir = `La dirección de envío es ${inputsFormConf.addresConf}`
  const obs = `Observaciones: ${inputsFormConf.observationConf}`

  const valorFinal = `Total: $${total}`

  const textParaURL = encodeURIComponent(text)
  const dirParaURL = encodeURIComponent(dir)
  const obsParaURL = encodeURIComponent(obs)
  const valorParaURL = encodeURIComponent(valorFinal)
  var hrefFinal = `${URIWhatsapp}${numTel}&text=${textParaURL}${saltoDeLinea}${productosParaURL}${saltoDeLinea}${lineaPunteada}${saltoDeLinea}${valorParaURL}${saltoDeLinea}${lineaPunteada}${saltoDeLinea}${dirParaURL}${saltoDeLinea}${obsParaURL}`

  const [pedidoConfirmado, setPedidoConfirmado] = useState(false)
  const [faltaNombre, setFaltaNombre] = useState('')
  const [faltaDireccion, setFaltaDireccion] = useState('')

  const confirmacionDeDatos = async (e) => {
    e.preventDefault()
    inputsFormConf.nameConf === ''
      ? setFaltaNombre(true)
      : setFaltaNombre(false)
    inputsFormConf.addresConf === ''
      ? setFaltaDireccion(true)
      : setFaltaDireccion(false)
  }

  useEffect(() => {
    if (faltaNombre === false && faltaDireccion === false)
      setPedidoConfirmado(true)
  }, [faltaNombre, faltaDireccion])

  const seguirEditando = () => {
    setPedidoConfirmado(false)
    setFaltaNombre('')
    setFaltaDireccion('')
  }

  const pedidoEnviado = () => {
    localStorage.clear()
  }

  return (
    <div className={styles.containerForm}>
      <div className={styles.containerBtnVolverAlCarrito}>
        <button className={styles.btnVolverAlCarrito}>
          <Link to='/carrito'>
            🢦 Volver al carrito
          </Link>
        </button>
      </div>
      <h4>Por favor, completá los siguientes datos para que podamos enviarte el pedido</h4>
      <form className={styles.formConfirmation} onSubmit={confirmacionDeDatos}>
        <div className={styles.itemForm}>
          <label htmlFor='nombre'>Decinos tu nombre: <label className={styles.required}>*</label></label>
          <input
            className={
              faltaNombre === true
                ? `${styles.error}`
                : `${styles.input}`
            }
            type="text"
            name='nameConf'
            placeholder='Nombre'
            autoComplete='username'
            value={inputsFormConf.nameConf}
            onChange={handleChange}
            disabled={
              pedidoConfirmado === true
                ? true
                : false
            }
          />
          <p className={
            faltaNombre === true
              ? `${styles.faltaNombre}`
              : `${styles.nombreOk}`
          }>Por favor, decinos a nombre de quien debemos enviar el pedido
          </p>
        </div>
        <div className={styles.itemForm}>
          <label htmlFor='nombre'>El pedido deberá enviarse a: <label className={styles.required}>*</label></label>
          <input
            className={
              faltaDireccion === true
                ? `${styles.error}`
                : `${styles.input}`
            }
            type="text"
            name='addresConf'
            placeholder='Dirección'
            autoComplete='addres'
            value={inputsFormConf.addresConf}
            onChange={handleChange}
            disabled={
              pedidoConfirmado === true
                ? true
                : false
            }
          />
          <p className={
            faltaDireccion === true
              ? `${styles.faltaDireccion}`
              : `${styles.direccionOk}`
          }>No olvides darnos una dirección
          </p>
        </div>
        <div className={styles.itemForm}>
          <label htmlFor='nombre'>¿Algo que quisieras aclarar/decir?:</label>
          <textarea
            name='observationConf'
            value={inputsFormConf.observationConf}
            placeholder='Observaciones'
            onChange={handleChange}
            disabled={
              pedidoConfirmado === true
                ? true
                : false
            }
          />
        </div>
        <div className={styles.containerBtn}>
          <button
            type='submit'
            className={styles.btnCheck}
            disabled={
              pedidoConfirmado === true
                ? true
                : false
            }
            title='Confirmación de datos'
          >
            <div className={styles.containerTildeOk}/>
          </button>
        </div>
      </form>

      {/* Mensaje de muestr */}
      <div className={styles.containerMuestraMensajeAEnviar}>
        {pedidoConfirmado === true
          && (
            <>
              <h5>Se va a enviar el siguiente mensaje:</h5>
              <p>
                Hola, mi nombre es {inputsFormConf.nameConf} y quisiera hacer el siguiente pedido:
              </p>
              ------------------------------
              {
                productosEnMemoria.map((prod) => (
                  <p key={prod.id}>{prod.name} x {prod.quantity} (${prod.price}) = ${prod.quantity * prod.price}</p>
                ))
              }
              ------------------------------
              <p>Total: ${total}</p>
              ------------------------------
              <p>La dirección de envío es {inputsFormConf.addresConf}</p>
              <p>Observaciones: {
                inputsFormConf.observationConf !== ''
                  ? inputsFormConf.observationConf
                  : '-'
              }
              </p>
            </>
          )}
      </div>

      {/*  */}

      <div className={styles.containerBtnEnviarPorWhatsapp}>
        {
          pedidoConfirmado === true
          && (
            <>
              <button
                className={`${styles.btnEnviarPedido} ${styles.btnSeguirEditando}`}
                title='Editar datos'
                onClick={seguirEditando}
              >
                <div className={`${styles.itemsBtnEnviarPedido} ${styles.btnEditarDatos}`}>
                  Editar datos
                </div>
              </button>
              <button
                className={`${styles.btnEnviarPedido} ${styles.btnEnviar}`}
                title='Enviar pedido por whatsapp'
              >
                <a
                  href={hrefFinal}
                  target='_blank'
                  rel="noopener noreferrer"
                  className={styles.enlaceEnviarPorWhatsapp}
                  onClick={pedidoEnviado}
                >
                  <div className={styles.itemsBtnEnviarPedido}>
                    <input
                      type='button'
                      className={styles.imgWhatsapp}
                      autoFocus />
                    Enviar
                  </div>
                </a>
              </button>
            </>
          )
        }
      </div>
    </div >
  )
}

