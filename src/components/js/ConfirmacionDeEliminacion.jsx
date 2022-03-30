import { useState, useEffect } from 'react'
import styles from '../css/ConfirmacionDeEliminacion.module.css'

export const ConfirmacionDeEliminacion = (props) => {

    const [confirmacionOculta, setConfirmacionOculta] = useState(true)

    useEffect(() => {
        props.oculto === true
            ? setConfirmacionOculta(true)
            : setConfirmacionOculta(false)
    }, [confirmacionOculta, props.oculto])

    const [btnDisabled, setBtnDisabled] = useState(false)

    const confirmarEliminacion = () => {
        setBtnDisabled(true)
        props.confirmacionEliminacion(props.id)
    }
    
    return (
        <div className={
            confirmacionOculta === true
                ? `${styles.containerVentanaConfirmacionDeEliminacionOculto}`
                : `${styles.containerVentanaConfirmacionDeEliminacion}`
        }>
            <div className={styles.ventanaConfirmacionDeEliminacion}>
                <p>¿Eliminamos este producto?</p>
                <div className={styles.containerBtns}>
                    <button
                        className={styles.btnCancelar}
                        onClick={props.cancelarEliminacion}
                    >Cancelar</button>
                    <button
                        className={styles.btnEliminar}
                        onClick={confirmarEliminacion}
                        disabled={
                            btnDisabled
                                ? true
                                : false
                        }
                    >Eliminar</button>
                </div>
            </div>
        </div>
    )
}
