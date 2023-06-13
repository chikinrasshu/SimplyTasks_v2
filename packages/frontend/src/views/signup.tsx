import React from "react";
import Window from "../components/window";

import config from "@simplytasks/common";

import { Alert, Button, FloatingLabel, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { FormEvent } from "react";

const SignUp: React.FC = () => {
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [msg, setMsg] = useState("");
    
    const handleForm = async (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        const res = await fetch(`${config.backend.host}:${config.backend.port}/user/add`, {
            method: "POST",
            mode: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, mail, pass}),
        });
        const json = await res.json();

        if (res.ok) {
            setMsg("Usuario creado con exito");
        } else {
            setMsg(json.msg);
        }
    };

    return (
        <Window title="Crear Cuenta">
            <Form onSubmit={handleForm} method="POST"> 
                <FloatingLabel controlId="name" label="Nombre de Usuario" className="mb-3">
                    <Form.Control type="text" placeholder="Nombre de Usuario" value={name} onChange={(v)=>setName(v.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="mail" label="Correo Electr&oacute;nico" className="mb-3">
                    <Form.Control type="email" placeholder="Correo Electr&oacute;nico" value={mail} onChange={(v)=>setMail(v.target.value)}  />
                </FloatingLabel>
                <FloatingLabel controlId="pass" label="Contrase&ntilde;a">
                    <Form.Control type="password" placeholder="Contrase&ntilde;a" value={pass} onChange={(v)=>setPass(v.target.value)}  />
                </FloatingLabel>

                {msg && (
                    <Alert variant="warning">{msg}</Alert>
                )}

                <Button type="submit" className="mt-3">Crear Cuenta</Button>
            </Form>
        </Window>
    );
};

export default SignUp;