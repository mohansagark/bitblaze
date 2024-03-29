// Square.js
import React from "react";
import Piece from "./Piece";

const Square = ({ piece, onClick }) => {
  return (
    <div className="square" onClick={onClick}>
      {piece && <Piece piece={piece} />}
    </div>
  );
};

export default Square;
