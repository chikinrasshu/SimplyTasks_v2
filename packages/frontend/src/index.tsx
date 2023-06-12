// Polyfills
import 'core-js/features/array/flat-map'
import 'core-js/features/map'
import 'core-js/features/promise'
import 'core-js/features/set'
import 'raf/polyfill'
import 'whatwg-fetch'

// React
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// chk
import App from "./app";

// Program
const container = document.getElementById("app-root") as HTMLElement;
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
