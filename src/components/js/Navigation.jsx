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
                    <Navbar.Brand as={Link} to='/' className={styles.nombreDelNavbar}>
                        Kiara
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/productos' className={styles.optionsNavbar}>Productos</Nav.Link>
                            <NavDropdown title="Categorías" id="collasible-nav-dropdown" className={`${styles.optionsNavbar}`}>
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
                            </NavDropdown>
                            <Nav.Link as={Link} to='/ofertas' className={styles.optionsNavbar}><b> Ver ofertas</b></Nav.Link>
                            <Nav.Link as={Link} to='/carrito' className={styles.optionsNavbar}>Carrito</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </nav >
    )
}
