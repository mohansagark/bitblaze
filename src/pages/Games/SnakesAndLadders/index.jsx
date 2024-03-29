// Game.js
import React, { useState } from "react";
import Board from "./Board";
import Player from "./Player";

const SnakesAndLadder = () => {
  const [playerPosition, setPlayerPosition] = useState(1);

  const rollDice = () => {
    const diceResult = Math.floor(Math.random() * 6) + 1;
    setPlayerPosition((prevPosition) =>
      Math.min(prevPosition + diceResult, 100)
    );
  };

  return (
    <div className="game">
      <Board size={10} playerPosition={playerPosition} />
      <Player />
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
};

export default SnakesAndLadder;
