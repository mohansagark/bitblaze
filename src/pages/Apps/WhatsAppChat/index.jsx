import React, { useState } from "react";
import Container from "../../../components/common/Container";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { Typography } from "@mui/material";

const WhatsAppChat = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const cleanedNumber = number.replace(/\D/g, "");
  const isValidNumber =
    cleanedNumber.length === 10 || cleanedNumber.length === 12;

  const handleSend = () => {
    if (!isValidNumber) {
      setError("Enter a valid mobile number.");
      return;
    }

    const phoneWithCountryCode =
      cleanedNumber.length === 10 ? `91${cleanedNumber}` : cleanedNumber;

    const url = `https://wa.me/${phoneWithCountryCode}`;
    window.open(url, "_blank");
    setError("");
  };

  return (
    <Container center>
      <div className="w-full max-w-sm p-6 rounded-xl shadow-md flex flex-col gap-6 bg-[var(--color-surface)] text-[var(--color-surface-text)]">
        <Typography
          variant="h5"
          className="text-center font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          Send WhatsApp Message
        </Typography>

        <Input
          label="Mobile Number"
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="e.g. 9876543210 or 919876543210"
          error={!!error}
          helperText={error}
        />

        <Button
          text="Send on WhatsApp"
          onClick={handleSend}
          id="whatsapp-send"
          sound
          disabled={!isValidNumber}
          className="rounded-lg"
          bgColor="var(--color-secondary)"
          bgHoverColor="var(--color-success)"
          textColor="var(--color-secondary-text)"
        />
      </div>
    </Container>
  );
};

export default WhatsAppChat;
