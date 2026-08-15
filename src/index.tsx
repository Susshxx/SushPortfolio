import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./Router";

const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<Router />);
}