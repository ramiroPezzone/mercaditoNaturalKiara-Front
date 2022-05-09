import React from 'react'
import { ProductosUsuarios } from '../../pages/js/ProductosUsuarios'
import styles from '../css/OrderBy.module.css'

const OrderBy = () => {

  const order = (e) => {
    console.log(e.target.value);
  }
  return (
    <div className={styles.containerProductosUsuarios}>
      <h2>Kiara</h2>
      <h3>Tu mercadito Natural</h3>
      <h4>Nos especializamos en productos para celíacos</h4>
      <label htmlFor="orderBy"><h5>Ordenar por:</h5></label>
      <select name="orderBy" id="orderBy" onChange={order}>
        <option value="name" key="name">Nombre</option>
        <option value="categorys" key="categorys">Categoría</option>
        <option value="price" key="price">Precio</option>
      </select>

      <ProductosUsuarios />
    </div>
  )
}

export default OrderBy