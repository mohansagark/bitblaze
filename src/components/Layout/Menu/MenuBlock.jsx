import { Box } from "@mui/material";
import { MdOutlineClose } from "react-icons/md";
import { useMenu } from "../../../helpers/hooks";
import SideDrawer from "../Sidebar";
import { mobileSidebarWidth } from "../../../helpers/config";

const MenuBlock = () => {
  const { toggleMenu } = useMenu();
  return (
    <Box
      role="presentation"
      sx={{ width: mobileSidebarWidth }}
      className="h-full bg-surface"
    >
      <div className="flex justify-between items-center p-4 ml-4">
        <p className="font-semibold text-lg text-surface-text">Menu</p>
        <MdOutlineClose
          size={24}
          className="text-primary"
          onClick={toggleMenu}
        />
      </div>
      <SideDrawer />
    </Box>
  );
};

export default MenuBlock;
