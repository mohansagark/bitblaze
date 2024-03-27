import React, { createContext, useContext, useState } from "react";
import {
  changePrimaryColor,
  changeTheme,
  persistData,
} from "../helpers/general";
import { DEFAULT_COLOR, DEFAULT_MODE } from "./defaultTheme";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [activeMenu, setActiveMenu] = useState(true);
  const [themeSettings, setThemeSettings] = useState(false);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [mode, setMode] = useState(DEFAULT_MODE);

  const changeMode = (newMode) => {
    setMode(newMode);
    changeTheme(newMode);
    persistData("themeMode", newMode);
  };

  const changeColor = (newColor) => {
    setColor(newColor);
    changePrimaryColor(newColor);
    persistData("colorMode", newColor);
  };
  return (
    <ThemeContext.Provider
      value={{
        color,
        mode,
        activeMenu,
        screenSize,
        themeSettings,
        setScreenSize,
        setActiveMenu,
        changeMode,
        changeColor,
        setThemeSettings,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useStateContext = () => useContext(ThemeContext);
