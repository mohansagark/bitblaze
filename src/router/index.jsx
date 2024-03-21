import { useEffect } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";
import ErrorPage from "../pages/Error";
import { useStateContext } from "../themes";
import routes from "./routes";
import { fetchStore } from "../helpers/general";

const LayoutComponent = () => {
  const { changeColor, changeMode } = useStateContext();
  useEffect(() => {
    const currentThemeColor = fetchStore("colorMode");
    const currentThemeMode = fetchStore("themeMode");
    if (currentThemeColor && currentThemeMode) {
      changeColor(currentThemeColor);
      changeMode(currentThemeMode);
    }
  }, [changeColor, changeMode]);

  return (
    <Layout>
      <main>
        <Outlet />
      </main>
    </Layout>
  );
};

const mappedRoutes = routes.map((route) => ({
  errorElement: <ErrorPage />,
  element: <LayoutComponent />,
  path: route.path,
  children: [
    {
      index: true,
      element: route.element,
    },
  ],
}));

const router = createBrowserRouter(mappedRoutes);

export default router;
