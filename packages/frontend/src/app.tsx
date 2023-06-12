import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from './notFound'
import Layout from "./layout";

const App: React.FC = () => {

    // Router
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <NotFound />,
            children: [
                {
                    path: "contacts",
                    element: <div>contatcs!</div>,
                },
            ]
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;