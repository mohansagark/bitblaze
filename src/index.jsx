import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { HelmetProvider } from "react-helmet-async";

import router from "./router";
import "./styles.scss";
import { ThemeProvider } from "./themes";
import ThemeSettings from "./components/Layout/ThemeSettings";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <StoreProvider store={store}>
          <ThemeSettings />
          <RouterProvider router={router} />
        </StoreProvider>
      </ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  </React.StrictMode>
);
