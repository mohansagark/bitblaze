import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { FaHandScissors, FaHandPaper, FaHandRock } from "react-icons/fa";
import Confetti from "react-confetti";
import Button from "../../../components/common/Button";
import { useAudio } from "../../../helpers/hooks";

const DATA = {
  rock: <FaHandRock size={36} />,
  paper: <FaHandPaper size={36} />,
  scissors: <FaHandScissors size={36} />,
};

const CHOICES = Object.keys(DATA);

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { playSound, registerAudio } = useAudio();
  const id = { won: "won-audio", lost: "lost-audio" };

  useEffect(() => {
    registerAudio(id.won, "bell");
    registerAudio(id.lost, "aww");
  }, [registerAudio, id.lost, id.won]);

  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  const handleChoice = (choice) => {
    const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    calculateResult(choice, computerChoice);
  };

  const calculateResult = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
      setResult("It's a tie!");
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      setResult("You win!");
      setShowConfetti(true);
      playSound(id.won);
    } else {
      setResult("Computer wins!");
      playSound(id.lost);
    }
  };

  return (
    <Container className="min-h-full !flex">
      <Grid
        container
        spacing={2}
        justifyContent="center"
        className="min-h-full"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          sm={6}
          className="flex !flex-col justify-center items-center text-center"
        >
          <Typography variant="h4" gutterBottom>
            Rock, Paper, Scissors
          </Typography>
          <div className="flex space-x-4">
            {CHOICES.map((choice) => (
              <Button
                id={choice}
                text={choice}
                key={choice}
                className="text-primary-text border-primary rounded-lg p-2"
                onClick={() => handleChoice(choice)}
                sound
              />
            ))}
          </div>
          {result && (
            <Typography variant="h6" style={{ marginTop: "1rem" }}>
              {result}
            </Typography>
          )}
          <div className="flex mt-8">
            {playerChoice && (
              <div className="flex flex-col items-center">
                <Typography variant="subtitle1">Your choice:</Typography>
                {DATA[playerChoice]}
              </div>
            )}
            {computerChoice && (
              <div className="flex flex-col items-center ml-8">
                <Typography variant="subtitle1">Computer's choice:</Typography>
                {DATA[computerChoice]}
              </div>
            )}
          </div>
        </Grid>
      </Grid>
      {showConfetti && (
        <Confetti
          drawShape={(ctx) => {
            ctx.beginPath();
            for (let i = 0; i < 22; i++) {
              const angle = 0.35 * i;
              const x = (0.2 + 1.5 * angle) * Math.cos(angle);
              const y = (0.2 + 1.5 * angle) * Math.sin(angle);
              ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.closePath();
          }}
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          onConfettiComplete={handleConfettiComplete}
        />
      )}
    </Container>
  );
};

export default RockPaperScissors;
