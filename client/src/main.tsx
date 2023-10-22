import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import AuthContextProvider from "./context/AuthContext.tsx";
import DataContextProvider from "./context/DataContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <DataContextProvider>
                    <App />
                </DataContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
