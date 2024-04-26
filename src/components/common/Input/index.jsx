import React from "react";
import "./Input.scss";
import { TextField } from "@mui/material";

const Input = ({ label }) => {
  return (
    <TextField
      InputProps={{
        sx: { color: "red" },
      }}
      className="input-field focus:border-primary"
      variant="outlined"
      label={label}
    />
  );
};

export default Input;
