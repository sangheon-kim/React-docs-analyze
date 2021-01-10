import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { debugContextDevtool } from "react-context-devtool";
import { CountProvider } from "./Contexts/Counter-context";
import { UserEnvProvider } from "./Contexts/UserEnv";

const container = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <CountProvider>
      <UserEnvProvider>
        <App />
      </UserEnvProvider>
    </CountProvider>
  </React.StrictMode>,
  container
);

reportWebVitals();

debugContextDevtool(container, { disable: process.env.NODE_ENV === "production" });
