import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Confetti from "react-confetti";
import Header from "./Header";
import Footer from "./Footer";
import SideDrawer from "./Sidebar";
import { useConfetti, useMenu } from "../../helpers/hooks";

const Layout = ({ children = <></> }) => {
  const { confetti } = useSelector((state) => state.general);
  const { hideConfetti } = useConfetti();
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
      {confetti.show && (
        <Confetti
          drawShape={(ctx) => {
            ctx.beginPath();
            for (let i = 0; i < 22; i++) {
              const angle = 0.35 * i;
              const x = (0.2 + 1.5 * angle) * Math.cos(angle);
              const y = (0.2 + 1.5 * angle) * Math.sin(angle);
              ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.closePath();
          }}
          width={confetti.width}
          height={confetti.height}
          recycle={confetti.recycle}
          numberOfPieces={confetti.numberOfPieces}
          onConfettiComplete={() => {
            hideConfetti();
          }}
        />
      )}
    </Grid>
  );
};

export default Layout;
