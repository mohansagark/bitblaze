import { useEffect, useState } from "react";
import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from "react-icons/fa";
import { GiQueenCrown } from "react-icons/gi";
import { RiCoinFill } from "react-icons/ri";
import { useAudio, useConfetti } from "../../../helpers/hooks";

const SnakesAndLadders = () => {
  const { showConfetti } = useConfetti();
  const { playSound, registerAudio } = useAudio();
  const id = { won: "won-audio", error: "error-audio", roll: "roll-audio" };
  const grid = new Array(10).fill(new Array(10).fill(0));
  const [coinPos, setCoinPos] = useState(0);
  const [diceValue, setDiceValue] = useState(6);

  useEffect(() => {
    registerAudio(id.won, "bell");
    registerAudio(id.error, "error");
    registerAudio(id.roll, "button");
  }, [registerAudio, id.error, id.roll, id.won]);

  const diceView = {
    1: <FaDiceOne size={60} />,
    2: <FaDiceTwo size={60} />,
    3: <FaDiceThree size={60} />,
    4: <FaDiceFour size={60} />,
    5: <FaDiceFive size={60} />,
    6: <FaDiceSix size={60} />,
  };

  const rollDice = () => {
    const rollValue = Math.ceil(Math.random() * 6);
    setDiceValue(rollValue);
    setCoinPos(coinPos + rollValue < 101 ? coinPos + rollValue : coinPos);
    if (coinPos === 100) {
      setCoinPos(0);
    }
    if (coinPos !== 100 && coinPos + rollValue > 100) {
      playSound(id.error);
      alert(`You need to roll ${100 - coinPos} or less to move ahead`);
    }
    if (coinPos + rollValue === 100) {
      setTimeout(() => {
        playSound(id.won);
        showConfetti();
      }, 10);
    }
    if (coinPos + rollValue < 100) {
      playSound(id.roll);
    }
  };

  return (
    <div className="text-center flex flex-col items-center justify-center">
      <div className="flex flex-col-reverse mt-10">
        {grid.map((row, rIdx) => {
          return (
            <div
              className={`flex text-background-text ${
                rIdx % 2 === 0 ? "flex-row" : "flex flex-row-reverse"
              }`}
              key={String(rIdx)}
            >
              {row.map((_col, cIdx) => {
                return (
                  <div
                    className="flex justify-center items-center w-12 h-12  border border-solid border-neutral600"
                    key={String(cIdx)}
                  >
                    {rIdx * 10 + cIdx + 1 === coinPos ? (
                      rIdx * 10 + cIdx + 1 === 100 ? (
                        <GiQueenCrown size={40} className="text-secondary" />
                      ) : (
                        <RiCoinFill size={30} className="text-secondary" />
                      )
                    ) : (
                      rIdx * 10 + cIdx + 1
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div
        className="flex items-center justify-center cursor-pointer w-[50px] h-[50px] rounded mt-[60px] bg-background text-secondary border-secondary"
        onClick={rollDice}
      >
        {diceView[diceValue]}
      </div>
    </div>
  );
};

export default SnakesAndLadders;
