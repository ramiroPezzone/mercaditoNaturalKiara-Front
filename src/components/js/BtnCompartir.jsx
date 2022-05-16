import React from 'react'
import styles from '../css/BtnCompartir.module.css'
import Swal from 'sweetalert2'

const BtnCompartir = ({ carritoActivo, url }) => {

  const share = (url) => {
    let shareObject = {
      title: "Mercadito Natural Kiara",
      text: "Mercadito Natural Kiara",
      url: url,
    }
    if (navigator.share) {
      navigator
        .share(shareObject)
        .then(() => console.log("Compartido exitosamente"))
        .catch(err => console.error(err))
    } else {
      navigator.clipboard.writeText(url)
        .then(() => console.log("texto copiado"))
        .catch(err => console.error(err))
      Swal.fire({
        title: 'Enlace copiado al portapapeles',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        timer: 3500,
        timerProgressBar: true,
        confirmButtonColor: "rgba(160, 183, 141, 1);"
      })
    }
  }

  return (
    <div className={
      carritoActivo
        ? styles.containerBtnCompartirDisplaced
        : styles.containerBtnCompartirLonely
    }
    >
      <div className={styles.btnCompartir} onClick={() => share(url)} title="compartir enlace" />
    </div>
  )
}

export default BtnCompartir