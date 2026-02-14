import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js"
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index.js";
import './styles/global.css';

const root = document.getElementById("root")!

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <DevSupport ComponentPreviews={ComponentPreviews}
        >
            <App/>
        </DevSupport>
    </React.StrictMode>
)