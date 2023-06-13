import React from "react";
import Window from "../components/window";

import config from "@simplytasks/common";

import { Button, FloatingLabel, Form, Row } from "react-bootstrap";

const SignUp: React.FC = () => {
    const action = `${config.backend.host}:${config.backend.port}/user/add`;

    return (
        <Window title="Crear Cuenta">
            <Form action={action} method="POST"> 
                <FloatingLabel controlId="name" label="Nombre de Usuario" className="mb-3">
                    <Form.Control type="text" placeholder="Nombre de Usuario" />
                </FloatingLabel>
                <FloatingLabel controlId="mail" label="Correo Electr&oacute;nico" className="mb-3">
                    <Form.Control type="email" placeholder="Correo Electr&oacute;nico" />
                </FloatingLabel>
                <FloatingLabel controlId="pass" label="Contrase&ntilde;a">
                    <Form.Control type="password" placeholder="Contrase&ntilde;a" />
                </FloatingLabel>

                <Button type="submit" className="mt-3">Crear Cuenta</Button>
            </Form>
        </Window>
    );
};

export default SignUp;