import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "/signup",
//     element: <Register />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
