import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store";
import { queryClient } from "./query/queryClient";
import App from "./App.jsx";
import "./styles/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(

  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer position="top-right" autoClose={1500} />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>

);
