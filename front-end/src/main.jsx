import "./index.css";
import App from "./App.jsx";

import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./context/UserContext.jsx";
import { StoreProvider } from "./context/StoreContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </UserProvider>
  </React.StrictMode>
);
