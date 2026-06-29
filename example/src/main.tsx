import "antd/dist/reset.css";
import "@lwmacct/260627-antd-workbench/global.css";
import "./styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRoot } from "./app/bootstrap/AppRoot";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);
