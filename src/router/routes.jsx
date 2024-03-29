import HoroscopeMatch from "../pages/Apps/HoroscopeMatch";
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
    element: <HoroscopeMatch />,
    // element: <ChessBoard />,
  },
  {
    path: routePaths.rockPaperScissors,
    element: <RockPaperScissors />,
  },
];

export default routes;
