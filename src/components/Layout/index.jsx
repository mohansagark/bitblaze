import React from "react";
import { Grid } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import SideDrawer from "./Sidebar";
import { useMenu } from "../../helpers/hooks";

const Layout = ({ children = <></> }) => {
  const { menu, isMobile, sidebarWidth, headerHeight, footerHeight } =
    useMenu();

  return (
    <Grid className="contents h-full overflow-y-auto" sx={{ flexGrow: 1 }}>
      {!isMobile && (
        <Grid
          className={`transition bg-surface ${
            menu ? "opacity-100" : "opacity-0"
          }`}
          sx={{ transition: "width 400ms ease", width: sidebarWidth }}
          item
        >
          <SideDrawer />
        </Grid>
      )}
      <Grid className="transition h-full overflow-y-auto" item sx={{ flex: 1 }}>
        <Header />
        <Grid
          className="bg-background mt-0 overflow-hidden text-primary p-5 flex"
          sx={{
            minHeight: `calc(100vh - ${footerHeight})`,
            paddingTop: headerHeight,
          }}
        >
          {children}
        </Grid>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Layout;
