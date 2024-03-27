import React from "react";
import { Grid } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import SideDrawer from "./Sidebar";
import { useMenu } from "../../helpers/hooks";

const Layout = ({ children = <></> }) => {
  const { sidebarWidth } = useMenu();

  return (
    <Grid container sx={{ flexGrow: 1 }}>
      <Grid
        className="transition bg-surface"
        sx={{ width: sidebarWidth, transition: "width 400ms ease" }}
        item
      >
        <SideDrawer />
      </Grid>
      <Grid className="transition" item sx={{ flex: 1 }}>
        <Header />
        <Grid
          className="bg-background"
          container
          style={{ marginTop: 0, minHeight: "calc(100vh - 164px)" }}
        >
          {children}
        </Grid>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Layout;
