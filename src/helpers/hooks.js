import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { setMenubar } from "../redux/slices/generalSlice";
import { sidebarWidth as sbWidth, headerHeight, footerHeight } from "./config";
import { ThemeContext } from "../themes";

export const useTheme = () => useContext(ThemeContext);

export const useMenu = () => {
  const dispatch = useDispatch();
  const { menubar: menu, isMobile } = useSelector((state) => state.general);

  const sidebarWidth = !isMobile && menu ? sbWidth : 0;

  const toggleMenu = () => {
    dispatch(setMenubar(!menu)); // Dispatching the action to toggle the menu
  };

  return {
    menu,
    toggleMenu,
    isMobile,
    sidebarWidth,
    headerHeight,
    footerHeight,
  }; // Returning menu state and toggleMenu function
};
