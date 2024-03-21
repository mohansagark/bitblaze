import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./router";
import "./styles.scss";
import { ThemeProvider } from "./themes";
import ThemeSettings from "./components/Layout/ThemeSettings";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ThemeSettings />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
