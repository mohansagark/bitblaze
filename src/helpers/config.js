import { FiCreditCard } from "react-icons/fi";
import { BsCurrencyDollar, BsShield } from "react-icons/bs";
import { GiRollingDices } from "react-icons/gi";
import { FaChess } from "react-icons/fa";
import { GiPapers, GiPokerHand } from "react-icons/gi";
import { routePaths } from "../router/routeConstants";

export const version = "Beta 0.0.1";

export const scrollDuration = 1000;

export const headerHeight = "64px";

export const footerHeight = "100px";

export const sidebarWidth = "250px";

export const mobileSidebarWidth = "80vw";

export const mobileViewBreakPoint = "(max-width:600px)";

export const THEMES = {
  DARK: "dark",
  LIGHT: "light",
};

export const COLORS = {
  green: "#00ccbc",
  blue: "#1A97F5",
  purple: "#7352FF",
  red: "#FF5C8E",
  indigo: "#1E4DB7",
  orange: "#FB9678",
};

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: "My Profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
  },
  {
    icon: <BsShield />,
    title: "My Inbox",
    desc: "Messages & Emails",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
  },
  {
    icon: <FiCreditCard />,
    title: "My Tasks",
    desc: "To-do and Daily Tasks",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
  },
];

export const menuList = [
  {
    icon: <GiRollingDices />,
    title: "Snakes & Ladder",
    path: routePaths.snakesAndLadders,
  },
  {
    icon: <FaChess />,
    title: "Chess Board",
    path: routePaths.chessboard,
  },
  {
    icon: <GiPapers />,
    title: "Rock Paper Scissors",
    path: routePaths.rockPaperScissors,
  },
  {
    icon: <GiPokerHand />,
    title: "Cards",
    path: routePaths.cards,
  },
];
