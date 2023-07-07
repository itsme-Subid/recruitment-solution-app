import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import App from "./App.tsx";
import "./styles/global.css";
import { ReduxProvider } from "./redux/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider>
      <Router>
        <App />
        <Toaster />
      </Router>
    </ReduxProvider>
  </StrictMode>
);
