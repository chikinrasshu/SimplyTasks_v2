import React from "react";
import Window from "../components/window";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Root: React.FC = () => {
    return (
        <Window title="Root!">
            <Form>
                <Row>
                    <Col md={6} className="mb-4">
                        <Link to="/signup"><Button variant="primary" className="w-100">Crear cuenta</Button></Link>
                    </Col>
                    <Col md={6} className="mb-4">
                        <Link to="/signin"><Button variant="secondary" className="w-100">Iniciar sesi&oacute;n</Button></Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="mb-4">
                        <Link to="/agregarItem"><Button variant="primary" className="w-100">Agregar &iacute;tem</Button></Link>
                    </Col>
                    <Col md={6} className="mb-4">
                        <Link to="/verCalendario"><Button variant="secondary" className="w-100">Ver calendario</Button></Link>
                    </Col>
                </Row>
            </Form> 
        </Window>
    );
};

export default Root;