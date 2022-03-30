import { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap'
import axios from "axios";
import styles from '../css/LoginPage.module.css'
const URI = require('../../URIs')

export const LoginPage = (props) => {

    const URIAdmins = URI.admins

    useEffect(() => {
        document.title = `Sección administración`;
    });

    // Datos para el logueo
    const [admin, setAdmin] = useState([]);
    const [pass, setPass] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        (async () => {
            const res = await axios.get(`${URIAdmins}`);
            if (isSubscribed === true) {
                setAdmin(res.data[0].nameAdmin);
                setPass(res.data[0].pass);
            }
        })();
        return () => isSubscribed = false
    }, []);

    const valorInicial = {
        nameInput: "",
        passInput: ""
    }
    const [usuarioLogin, setUsuarioLogin] = useState(valorInicial)

    const capturarDatos = (e) => {
        const { name, value } = e.target;
        setUsuarioLogin({ ...usuarioLogin, [name]: value })
    }

    // Captura de datos del form, almacenamiento en memoria del inicio de sesión
    const [logOk, setLogOk] = useState(false)
    const [recordarme, setRecordarme] = useState(false)
    const [classUsuario, setClassUsuario] = useState(true)
    const [classPass, setClassPass] = useState(true)
    const [classNoUsuario, setClassNoUsuario] = useState(true)
    const [classNoPass, setClassNoPass] = useState(true)

    // Handler del checkbox "recordarme"
    const checkbox = (e) => {
        const isChecked = e.target.checked
        setRecordarme(isChecked)
    }

    // Handler del login
    const login = (e) => {
        e.preventDefault();
        const { nameInput, passInput } = usuarioLogin;

        // Checkeo de nombre de usuario y contraseña
        nameInput !== admin || passInput !== pass
            ? setLogOk(false)
            : setLogOk(true)

        // Mensaje de 'ingrese usuario'
        nameInput === ''
            ? setClassNoUsuario(false)
            : setClassNoUsuario(true)

        // Mensaje de usuario incorrecto
        nameInput !== admin && nameInput !== ''
            ? setClassUsuario(false)
            : setClassUsuario(true)

        // Mensaje de 'ingrese contraseña'
        passInput === ''
            ? setClassNoPass(false)
            : setClassNoPass(true)

        // Mensaje de contraseña incorrecta
        passInput !== pass && passInput !== ''
            ? setClassPass(false)
            : setClassPass(true)

        // Si todo es correcto
        nameInput === admin && passInput === pass
            ? setLogOk(true)
            : setLogOk(false)
    }

    useEffect(() => {
        if (logOk === true) {
            props.avisoDeInicio()
        }
    }, [logOk])

    useEffect(() => {
        // Si NO selecciona "recordarme"
        if (logOk === true && recordarme === false) {
            sessionStorage.setItem('sessionLog', 'ok')
        }

        // Si selecciona "recordarme"
        if (logOk === true && recordarme === true) {
            localStorage.setItem('localLog', 'ok')
        }
    }, [logOk])


    return (
        <div className={styles.containerFormLogin}>
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                        type="text"
                        autoComplete="username"
                        placeholder="usuario"
                        name="nameInput"
                        value={usuarioLogin.nameInput}
                        onChange={capturarDatos}
                    />
                </Form.Group>

                <p className={
                    classNoUsuario
                        ? styles.usuarioOk
                        : styles.revelarMensaje1
                }>
                    Debe ingresar un usuario
                </p>

                <p className={
                    classUsuario
                        ? styles.usuarioOk
                        : styles.revelarMensaje2
                }>
                    Usuario incorrecto
                </p>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        autoComplete="current-password"
                        placeholder="contraseña"
                        name='passInput'
                        value={usuarioLogin.pass}
                        onChange={capturarDatos}
                    />
                </Form.Group>

                <p className={
                    classNoPass
                        ? styles.usuarioOk
                        : styles.revelarMensaje1
                }>
                    Debe ingresar una contraseña
                </p>

                <p className={
                    classPass
                        ? styles.passOk
                        : styles.revelarMensaje2
                }>
                    Contraseña incorrecta
                </p>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Recordarme"
                        value="recordarme"
                        name="checkbox"
                        onClick={checkbox}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Aceptar
                </Button>
            </Form>
        </div>
    )
}
