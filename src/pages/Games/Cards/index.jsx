import React, { useEffect, useState } from "react";
import Card from "./Card";

const Cards = () => {
  const [availableCards, setAvailableCards] = useState(
    Array.from({ length: 52 }, (_, index) => index + 1)
  );
  const [selectedCard, setSelectedCard] = useState(null);
  const radius = 250; // Adjust radius as needed
  const centerX = -120; // Adjust center x-coordinate as needed
  const centerY = -120; // Adjust center y-coordinate as needed
  const startAngle = -Math.PI / 2; // Start angle (pointing upwards)
  const angleIncrement = Math.PI / (availableCards.length - 1); // Even spacing between cards
  const cardRotation = 180 / availableCards.length; // Rotation angle for each card

  useEffect(() => {
    const letters = Array.from({ length: 4 }, (_, index) => index + 1);
    const numbers = Array.from({ length: 13 }, (_, index) => index + 1);
    const combinations = [];
    for (const letter of letters) {
      for (const number of numbers) {
        combinations.push({
          symbol: letter,
          number,
        });
      }
    }

    for (let i = combinations.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combinations[i], combinations[j]] = [combinations[j], combinations[i]];
    }

    setAvailableCards(combinations);
  }, []);

  const [hover, setHover] = useState(null);
  const hoverCard = (card) => {
    if (card !== hover) {
      setHover(card);
    }
  };

  const pickCard = (card) => {
    const remainingCards = availableCards.filter(
      (c) => c.symbol !== card.symbol || c.number !== card.number
    );
    const pickedCard = availableCards.find(
      (c) => c.symbol === card.symbol && c.number === card.number
    );

    setAvailableCards(remainingCards);
    setSelectedCard(pickedCard);
  };

  return (
    <div className="flex w-full min-h-full relative justify-center items-center">
      <div
        className=" flex justify-center items-center absolute top-[50%] left-[53%]"
        style={{ transform: "rotate(-85deg)" }}
      >
        <div className="deck relative">
          {availableCards.map((card, index) => {
            const angle = startAngle + index * angleIncrement;
            const position = hover === index ? radius + 50 : radius;
            const cardX = centerX + position * Math.cos(angle);
            const cardY = centerY + position * Math.sin(angle);
            return (
              <div
                key={index}
                className="min-w-24 min-h-36 bg-transparent absolute"
                style={{
                  left: cardX,
                  top: cardY,
                  zIndex: index,
                  transform: `rotate(${index * cardRotation}deg)`,
                }}
              >
                <div
                  onMouseEnter={() => hoverCard(index)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => pickCard(card)}
                  className="w-24 h-36 cursor-pointer hover:bg-primary flex items-center justify-center"
                  style={{
                    left: cardX,
                    top: cardY,
                    zIndex: index,
                  }}
                >
                  <Card />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-24 h-36 cursor-pointer flex items-center justify-center">
        <Card show={selectedCard} card={selectedCard} />
      </div>
    </div>
  );
};

export default Cards;
