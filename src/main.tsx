import React from "react";
import ReactDOM from "react-dom/client";
import Providers from "./providers";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
);
