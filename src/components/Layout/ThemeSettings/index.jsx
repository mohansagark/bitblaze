import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { FiSettings } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import { COLORS } from "../../../helpers/config";
import { useTheme } from "../../../themes";

const ThemeSettings = () => {
  const {
    themeSettings,
    setThemeSettings,
    color,
    mode,
    changeMode,
    changeColor,
  } = useTheme();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setThemeSettings(open);
  };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className="flex justify-between items-center p-4 ml-4">
        <p className="font-semibold text-lg">Settings</p>
        <button
          type="button"
          onClick={() => setThemeSettings(false)}
          style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
          className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
        >
          <MdOutlineCancel />
        </button>
      </div>
      <div className="flex-col border-t-1 border-color p-4 ml-4">
        <p className="font-semibold text-xl ">Theme Option</p>

        <div className="mt-4">
          <input
            type="radio"
            id="light"
            name="theme"
            value="Light"
            className="cursor-pointer"
            onChange={changeMode}
            checked={mode === "Light"}
          />
          <label htmlFor="light" className="ml-2 text-md cursor-pointer">
            Light
          </label>
        </div>
        <div className="mt-2">
          <input
            type="radio"
            id="dark"
            name="theme"
            value="Dark"
            onChange={changeMode}
            className="cursor-pointer"
            checked={mode === "Dark"}
          />
          <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
            Dark
          </label>
        </div>
      </div>
      <div className="p-4 border-t-1 border-color ml-4">
        <p className="font-semibold text-xl ">Theme Colors</p>
        <div className="flex gap-3">
          {Object.entries(COLORS).map((item, index) => (
            <Tooltip key={index} title={item[0]} placement="top">
              <div
                className="relative mt-2 cursor-pointer flex gap-5 items-center"
                key={item[0]}
              >
                <button
                  type="button"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  style={{ backgroundColor: item[1] }}
                  onClick={() => changeColor(item[1])}
                >
                  <BsCheck
                    className={`ml-2 text-2xl text-white ${
                      item[1] === color ? "block" : "hidden"
                    }`}
                  />
                </button>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </Box>
  );

  return (
    <>
      <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
        <Tooltip title="Settings" placement="top">
          <Button
            type="button"
            onClick={toggleDrawer(true)}
            style={{ background: color, borderRadius: "50%" }}
            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <FiSettings />
          </Button>
        </Tooltip>
      </div>
      <Drawer
        anchor={"right"}
        open={themeSettings}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </>
  );
};

export default ThemeSettings;
