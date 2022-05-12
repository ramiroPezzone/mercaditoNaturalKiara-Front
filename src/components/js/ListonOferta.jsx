import React from 'react'
import styles from '../css/ListonOferta.module.css'

const ListonOferta = ({oferta}) => {

  return (
    <div className=
    {
        oferta !== undefined && oferta === true
            ? styles.oferta
            : styles.noOferta
    }
/>
)
}

export default ListonOferta