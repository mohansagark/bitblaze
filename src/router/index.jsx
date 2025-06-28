import { useEffect } from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ErrorPage from "../pages/Error";
import routes from "./routes";
import { fetchStore } from "../helpers/general";
import { useDispatch } from "react-redux";
import { setMobile } from "../redux/slices/generalSlice";
import { useMediaQuery } from "@mui/material";
import { mobileViewBreakPoint } from "../helpers/config";
import { useTheme } from "../helpers/hooks";
import NotFound from "../pages/common/NotFound";

const LayoutComponent = () => {
  const { changeColor, changeMode } = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(mobileViewBreakPoint);

  useEffect(() => {
    dispatch(setMobile(isMobile));
  }, [dispatch, isMobile]);

  useEffect(() => {
    const currentThemeColor = fetchStore("colorMode");
    const currentThemeMode = fetchStore("themeMode");
    if (currentThemeColor || currentThemeMode) {
      changeColor(currentThemeColor);
      changeMode(currentThemeMode);
    }
  }, [changeColor, changeMode]);

  return (
    <Layout>
      <main className="w-full">
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

mappedRoutes.push(
  {
    path: "/404",
    element: <LayoutComponent />,
    children: [
      {
        index: true,
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  }
);
const router = createBrowserRouter(mappedRoutes);

export default router;
