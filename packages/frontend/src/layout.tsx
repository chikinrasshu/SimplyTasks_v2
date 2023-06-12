import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {

    return (
        <>
            <Navbar collapseOnSelect expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <LinkContainer to="/">
                            <Nav.Link>
                                <img src="img/logo.svg" width={30} height={30} />
                                &nbsp;SimplyTasks
                            </Nav.Link>
                        </LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/test"><Nav.Link>Test</Nav.Link></LinkContainer>
                            <LinkContainer to="/tareas"><Nav.Link>Tareas</Nav.Link></LinkContainer>
                            <LinkContainer to="/progreso"><Nav.Link>Progreso</Nav.Link></LinkContainer>
                            <LinkContainer to="/horario"><Nav.Link>Horario</Nav.Link></LinkContainer>
                            <LinkContainer to="/notificaciones"><Nav.Link>Notificaciones</Nav.Link></LinkContainer>
                        </Nav>
                        <Nav>
                            <LinkContainer to="/signin"><Nav.Link>Iniciar Sesi&oacute;n</Nav.Link></LinkContainer>
                            <LinkContainer to="/signup"><Nav.Link>Crear Cuenta</Nav.Link></LinkContainer>
                        </Nav>
                        <Nav>
                            <NavDropdown align="end" title="Link" id="navbarScrollingDropdown">
                                <LinkContainer to="/perfil"><NavDropdown.Item>Perfil</NavDropdown.Item></LinkContainer>
                                <LinkContainer to="/ajustes"><NavDropdown.Item>Ajustes</NavDropdown.Item></LinkContainer>
                                <LinkContainer to="/ayuda"><NavDropdown.Item>Ayuda</NavDropdown.Item></LinkContainer>
                                <NavDropdown.Divider />
                                <LinkContainer to="/signout"><NavDropdown.Item>Cerrar Sesi&oacute;n</NavDropdown.Item></LinkContainer>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <main>
                <Outlet />
            </main>

            <footer className="mt-auto">
                <Container fluid className='text-center'>
                    <span>&copy; 2023 chk. Todos los derechos reservados.</span>
                </Container>
            </footer>
        </>
    );
};

export default Layout;