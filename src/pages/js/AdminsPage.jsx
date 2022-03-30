import { useEffect, useState } from 'react'
import { LoginPage } from './LoginPage'
import { ProductosAdmins } from './ProductosAdmins'

export const AdminsPage = () => {

    const logSession = sessionStorage.getItem('sessionLog')
    const logLocal = localStorage.getItem('localLog')

    const [avisoDeInicio, setAvisoDeInicio] = useState(false)
    const [avisoDeCierre, setAvisoDeCierre] = useState(false)

    const [logueado, setLogueado] = useState(false)

    useEffect(() => {
        (logSession === 'ok' || logLocal === 'ok') && setLogueado(true)
    }, [avisoDeInicio, avisoDeCierre])

    const inicioIsTrue = () => {
        setAvisoDeInicio(!avisoDeInicio)
    }
    const cierreIsTrue = () => {
        setAvisoDeCierre(!avisoDeCierre)
        setLogueado(!logueado)
    }

    if (logueado === true) {
        return (
            <ProductosAdmins
                avisoDeCierre={cierreIsTrue} />
        )
    }

    if (logueado === false) {
        return (
            <LoginPage
                avisoDeInicio={inicioIsTrue}
            />
        )
    }
}
