import React, { useEffect, useRef } from 'react'
import styles from '../css/ModalProducto.module.css'

const ModalProducto = ({ detalles, ocultarModal }) => {

  const detallesModal = useRef()

  const cerrarModal = () => {
    ocultarModal()
  }

  useEffect(() => {
    if (detalles.id !== undefined) {
      document.querySelector("*").style.overflowY = "hidden"
      console.log(detallesModal.current);
      detallesModal.current.style.overflowY = "scroll"
      // document.querySelector(".descriptionModal").style.overflowY = "hidden"
    } else {
      document.querySelector("*").style.overflowY = "initial"
    }
  }, [detalles.id])

  return (
    <div
      className={
        detalles.id
          ? `${styles.showInfo}`
          : `${styles.infoHidden}`
      }
    >
      <div className={styles.cerrarModal} onClick={cerrarModal} />
      <div className={styles.containerDetallesModal} >
        <p className={styles.titleModal}>{detalles.name}</p>
        <div className={styles.detallesProducto}>
          <div className={styles.containerImg} style={{ backgroundImage: `url(${detalles.image})` }} />
          <div className={styles.textoProducto}>
            <p className={styles.descriptionModal} ref={detallesModal}>{detalles.description}</p>
            <p className={styles.unityModal}>Venta por {detalles.unity}</p>
            <p className={styles.priceModal}>${detalles.price}</p>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ModalProducto