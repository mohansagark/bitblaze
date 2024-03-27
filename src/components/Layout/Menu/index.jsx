import React from "react";
import { Drawer, Tooltip } from "@mui/material";
import { useMenu } from "../../../helpers/hooks";
import MenuBlock from "./MenuBlock";
import HamburgerIcon from "../../common/HamburgerIcon";

const CustomMenu = () => {
  const { menu, toggleMenu, isMobile } = useMenu();
  return (
    <>
      <aside>
        <Tooltip title="Menu" placement="top">
          <>
            <HamburgerIcon />
          </>
        </Tooltip>
      </aside>
      <Drawer anchor={"left"} open={isMobile && menu} onClose={toggleMenu}>
        <MenuBlock />
      </Drawer>
    </>
  );
};

export default CustomMenu;
