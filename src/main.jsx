import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App.jsx";
import "./styles/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(

  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer position="top-right" autoClose={1500} />
    </Provider>
  </BrowserRouter>

);
