import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from './notFound'
import Layout from "./layout";
import Root from "./views/root";

const App: React.FC = () => {

    // Router
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <NotFound />,
            children: [
                {
                    path: "/test",
                    element: <Root/>,
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