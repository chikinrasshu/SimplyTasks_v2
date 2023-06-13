import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import NotFound from './notFound'
import Layout from "./layout";
import Root from "./views/root";
import SignIn from "./views/signin";
import SignUp from "./views/signup";

const App: React.FC = () => {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Root />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate replace to="/404" />} />
                </Route>
            </Routes>
        </BrowserRouter>
        </>
    );
};

export default App;