import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Header from "./Header";
import SideDrawer from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children = <></> }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Grid container spacing={2} style={{ marginTop: 0 }}>
        <Grid item xs={3}>
          <SideDrawer />
        </Grid>
        <Grid item xs={9} style={{ minHeight: "calc(100vh - 164px)" }}>
          {children}
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default Layout;
