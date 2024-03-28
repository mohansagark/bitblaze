import React from "react";
import { Grid } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import SideDrawer from "./Sidebar";
import { useMenu } from "../../helpers/hooks";

const Layout = ({ children = <></> }) => {
  const { menu, isMobile, sidebarWidth } = useMenu();

  return (
    <Grid className="contents h-full overflow-y-auto" sx={{ flexGrow: 1 }}>
      {!isMobile && (
        <Grid
          className={`transition bg-surface ${
            menu ? "opacity-100" : "opacity-0"
          } w-[${sidebarWidth}]`}
          sx={{ transition: "width 400ms ease" }}
          item
        >
          <SideDrawer />
        </Grid>
      )}
      <Grid className="transition h-full overflow-y-auto" item sx={{ flex: 1 }}>
        <Header showLogo />
        <Grid className="bg-background h-[calc(100vh - 100px)] mt-0 overflow-hidden">
          {children}
        </Grid>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Layout;
