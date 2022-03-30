import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { ConfirmacionDeEliminacion } from "./ConfirmacionDeEliminacion";
import axios from 'axios';
import styles from '../css/CardProductoAdmin.module.css'

export const CardProductoAdmin = (props) => {

    const URIDelete = 'http://localhost:8080/admins/productos'

    const [confirmacionOculta, setConfirmacionOculta] = useState(true)

    const eliminarProducto = () => {
        setConfirmacionOculta(false)
    }

    const cancelarEliminacion = () => {
        setConfirmacionOculta(true)
    }

    const confirmacionEliminacion = async (id) => {
        await axios.delete(`${URIDelete}/${id}`)
        props.avisoDeEliminacion()
    }

    return (
        <Card style={{ width: '18rem' }} className={styles.containerGralCard}>
            <ConfirmacionDeEliminacion
                oculto={confirmacionOculta}
                id={props.id}
                cancelarEliminacion={cancelarEliminacion}
                confirmacionEliminacion={confirmacionEliminacion}
            />
            <Card.Img variant="top" src={props.img} />
            <Card.Body className={styles.cardContainer}>
                <Card.Title>{props.name}</Card.Title>
                <hr />
                <Card.Text className={styles.descriptionProd}>
                    {props.description}
                </Card.Text>
                <hr />
                <Card.Text>
                    Venta por <span className={styles.unity}>{props.unity}</span>
                </Card.Text>
                <Card.Text>
                    Cantidad disponible {props.quantity}
                </Card.Text>
                <Card.Text>
                    Agregado en las categorías:
                </Card.Text>
                {
                    props.categorys.map(cat => (
                        <p
                            className={styles.categorys}
                            key={cat._id}
                        >
                            -{cat.value}
                        </p>
                    ))
                }
                <Card.Text>
                    $ {props.price}
                </Card.Text>
                <div className={styles.containerButtons}>

                    {/* Edición de producto */}
                    <Link to={`/editar-producto/${props.id}`}>
                        <button className={styles.btnEditar}>
                            Editar
                        </button>
                    </Link>
                    {/*  */}

                    {/* Botón de eliminación de producto */}
                    <button className={styles.btnEliminar} onClick={eliminarProducto}>Eliminar</button>
                    {/*  */}
                </div>

            </Card.Body>
        </Card>
    )
}
