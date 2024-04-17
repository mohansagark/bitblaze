import WhatsAppChat from "../pages/Apps/WhatsAppChat";
import Cards from "../pages/Games/Cards";
import ChessBoard from "../pages/Games/ChessBoard";
import RockPaperScissors from "../pages/Games/RockPaperScissors";
import SnakesAndLadders from "../pages/Games/SnakesAndLadders";
import Home from "../pages/Home";
import { routePaths } from "./routeConstants";

const routes = [
  {
    path: routePaths.home,
    element: <Home />,
  },
  {
    path: routePaths.snakesAndLadders,
    element: <SnakesAndLadders />,
  },
  {
    path: routePaths.chessboard,
    element: <ChessBoard />,
  },
  {
    path: routePaths.rockPaperScissors,
    element: <RockPaperScissors />,
  },
  {
    path: routePaths.cards,
    element: <Cards />,
  },
  {
    path: routePaths.whatsAppChat,
    element: <WhatsAppChat />,
  },
];

export default routes;
