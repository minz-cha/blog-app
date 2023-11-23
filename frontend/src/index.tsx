import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import firebase from "firebaseApp";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "context/AuthContext";

console.log(firebase);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthContextProvider>
    <Router>
      <App />
    </Router>
  </AuthContextProvider>
);
