// Board.js
import React from "react";
import Square from "./Square";
import "./index.css";

const Board = ({ size, playerPosition }) => {
  const renderSquares = () => {
    const squares = [];
    for (let i = size * size - 1; i >= 0; i--) {
      const row = Math.floor(i / size);
      const col = (size - 1 - row) % 2 === 0 ? i % size : size - 1 - (i % size);
      const position = i + 1;
      squares.push(
        <Square
          key={position}
          position={position}
          isPlayerHere={position === playerPosition}
        />
      );
    }
    return squares;
  };

  return <div className="board">{renderSquares()}</div>;
};

export default Board;
