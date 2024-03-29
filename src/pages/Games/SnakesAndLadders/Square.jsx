// Square.js
import React from "react";

const Square = ({ position, isPlayerHere }) => {
  return (
    <div className={`square ${isPlayerHere ? "player" : ""}`}>{position}</div>
  );
};

export default Square;
