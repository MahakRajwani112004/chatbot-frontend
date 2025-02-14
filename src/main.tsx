import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "regenerator-runtime/runtime";
import "@/styles/globals.css";
import { Provider } from "./provider.tsx";
import App from "./App.tsx";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <ToastContainer
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          draggable
        />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
