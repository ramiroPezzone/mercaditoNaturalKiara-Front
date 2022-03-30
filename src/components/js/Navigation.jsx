import { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from "react-router-dom";
import URIs from "../../URIs";
import axios from "axios"
import styles from '../css/Navigation.module.css'

export const Navigation = () => {

    const [categorys, setCategorys] = useState([])

    useEffect(() => {
        (async () => {
            const categorysDB = await axios.get(URIs.categorys)
            setCategorys(categorysDB.data)
        })()
    }, [])

    return (
        <nav className={styles.containerBGNavBar}>
        <Navbar collapseOnSelect expand="lg" className={styles.navPersonalizada}>
            <Container className={styles.containerNavBar}>
                <Navbar.Brand as={Link} to='/'>
                    Kiara
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/productos'>Productos</Nav.Link>
                        <NavDropdown title="Categorías" id="collasible-nav-dropdown">
                            {
                                categorys.map(cat => (
                                    <div key={cat._id}>
                                        <NavDropdown.Item
                                            as={Link}
                                            to={`/category/${cat.value}`}
                                        >
                                            {cat.value}
                                        </NavDropdown.Item>
                                    </div>
                                ))
                            }
                            {/* <NavDropdown.Divider /> */}
                        </NavDropdown>
                        <Nav.Link as={Link} to='/carrito'>Carrito</Nav.Link>
                    </Nav>
                    <div className={styles.lineaDivisora} />
                    <Nav className={`me-5 ${styles.optionAdmins}`}>
                        <Nav.Link as={Link} to='/admins' className={styles.aOptionAdmin}>Solo admins</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </nav>
    )
}
