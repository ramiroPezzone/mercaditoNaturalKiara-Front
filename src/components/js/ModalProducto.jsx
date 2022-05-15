import React from 'react'
import styles from '../css/ModalProducto.module.css'

const ModalProducto = ({ detalles, ocultarModal }) => {

  const cerrarModal = () => {
    ocultarModal()
  }

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
            <p className={styles.descriptionModal}>{detalles.description}</p>
            <p className={styles.unityModal}>Venta por {detalles.unity}</p>
            <p className={styles.priceModal}>${detalles.price}</p>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ModalProducto