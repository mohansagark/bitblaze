import { useDispatch, useSelector } from "react-redux";
import { useContext, useRef } from "react";
import {
  setMenubar,
  startConfetti,
  stopConfetti,
} from "../redux/slices/generalSlice";
import { sidebarWidth as sbWidth, headerHeight, footerHeight } from "./config";
import { ThemeContext } from "../themes";

export const useTheme = () => useContext(ThemeContext);

export const useConfetti = () => {
  const dispatch = useDispatch();

  const showConfetti = () => {
    dispatch(startConfetti());
  };
  const hideConfetti = () => {
    dispatch(stopConfetti());
  };

  return {
    showConfetti,
    hideConfetti,
  };
};

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
  };
};

export const useAudio = () => {
  const audioRefs = useRef({});

  const playSound = (id = "audio") => {
    const audioRef = audioRefs.current[id];
    if (audioRef) {
      audioRef.play();
    }
  };

  const registerAudio = (id = "audio", variant = "button") => {
    const audioRef = document.createElement("audio");
    audioRef.src = `audio/${variant}.mp3`;
    audioRefs.current[id] = audioRef;
  };

  return { playSound, registerAudio };
};
