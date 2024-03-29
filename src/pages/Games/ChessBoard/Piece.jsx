// Piece.js
import React from "react";

const Piece = ({ piece }) => {
  return <div className={`piece ${piece.color}`}>{piece.type}</div>;
};

export default Piece;
