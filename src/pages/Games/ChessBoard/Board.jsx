// Board.js
import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((square, colIndex) => (
            <Square
              key={colIndex}
              piece={square}
              onClick={() => onClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
