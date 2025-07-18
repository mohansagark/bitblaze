import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import { GiRollingDices } from 'react-icons/gi';
import { FaChess } from 'react-icons/fa';
import { GiPapers, GiPokerHand } from 'react-icons/gi';
import { TbNumbers } from 'react-icons/tb';
import { routePaths } from '../router/routeConstants';
import { IoLogoWhatsapp } from 'react-icons/io';

export const version = 'Beta 0.0.1';

export const scrollDuration = 1000;

export const headerHeight = '64px';

export const footerHeight = '100px';

export const sidebarWidth = '250px';

export const mobileSidebarWidth = '80vw';

export const mobileViewBreakPoint = '(max-width:600px)';

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const COLORS = {
  green: '#00ccbc',
  blue: '#1A97F5',
  purple: '#7352FF',
  red: '#FF5C8E',
  indigo: '#1E4DB7',
  orange: '#FB9678',
};

export const userProfileData = [
  {
    icon: <FaLinkedin />,
    title: 'LinkedIn',
    desc: 'Connect with me',
    iconColor: '#0077B5',
    iconBg: '#E8F4F9',
    link: 'https://www.linkedin.com/in/mohansagark/',
  },
  {
    icon: <FaGithub />,
    title: 'GitHub',
    desc: 'View my code',
    iconColor: '#333',
    iconBg: '#F0F0F0',
    link: 'https://github.com/mohansagark',
  },
  {
    icon: <TbWorld />,
    title: 'Portfolio',
    desc: 'Explore my work',
    iconColor: '#4B5563',
    iconBg: '#E5E7EB',
    link: 'https://devmohan.in',
  },
];

export const menuList = [
  {
    icon: <GiRollingDices />,
    title: 'Snakes & Ladder',
    path: routePaths.snakesAndLadders,
    category: 'game',
  },
  {
    icon: <FaChess />,
    title: 'Chess Board',
    path: routePaths.chessboard,
    category: 'game',
  },
  {
    icon: <GiPapers />,
    title: 'Rock Paper Scissors',
    path: routePaths.rockPaperScissors,
    category: 'game',
  },
  {
    icon: <GiPokerHand />,
    title: 'Cards',
    path: routePaths.cards,
    category: 'game',
  },
  {
    icon: <TbNumbers />,
    title: '2048',
    path: routePaths.twentyFortyEight,
    category: 'game',
  },
  {
    icon: <IoLogoWhatsapp />,
    title: 'Whats App Chat',
    path: routePaths.whatsAppChat,
    category: 'app',
  },
];
