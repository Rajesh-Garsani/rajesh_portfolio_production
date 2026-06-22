import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { PortfolioProvider } from "./context/PortfolioContext";
import "./index.css";
createRoot(document.getElementById("root")!).render(<React.StrictMode><PortfolioProvider><App /></PortfolioProvider></React.StrictMode>);
