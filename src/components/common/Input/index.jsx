import "./Input.scss";
import { TextField } from "@mui/material";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  maxLength,
  error = false,
  helperText = "",
}) => {
  return (
    <TextField
      InputProps={{
        sx: { color: "inherit" },
      }}
      className="input-field focus:border-primary"
      variant="outlined"
      label={label}
      fullWidth
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      inputProps={{ maxLength }}
      error={error}
      helperText={helperText}
    />
  );
};

export default Input;
