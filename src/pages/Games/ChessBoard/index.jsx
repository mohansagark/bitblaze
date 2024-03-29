// App.js
import React, { useState } from "react";
import Board from "./Board";
import { piecesInitialState } from "./constants";

const ChessBoard = () => {
  const [squares, setSquares] = useState(piecesInitialState);

  const handleClick = (row, col) => {
    // This function handles the piece movement logic
    // For simplicity, let's just move the piece to the clicked square
    const newSquares = squares.map((r) => [...r]);
    newSquares[row][col] = squares[0][0];
    newSquares[0][0] = null; // Clear the source square
    setSquares(newSquares);
  };

  return (
    <div className="App">
      <h1>React Chess Game</h1>
      <Board squares={squares} onClick={handleClick} />
    </div>
  );
};

export default ChessBoard;
