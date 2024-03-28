import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { MdClear, MdManageSearch } from "react-icons/md";

const SearchInput = ({ onSearch }) => {
  const [value, setValue] = useState("");
  const onChangeInput = (text) => {
    setValue(text);
    onSearch(text);
  };

  return (
    <TextField
      placeholder="Search"
      type="text"
      variant="standard"
      value={value}
      fullWidth
      size="small"
      onChange={(e) => onChangeInput(e.target.value)}
      className=" border-primary shadow-none"
      InputLabelProps={{ className: "text-primary text-xs" }}
      InputProps={{
        className:
          "border-primary text-primary shadow-none hover:shadow-none before:border-primary after:border-primary text-xs",
        startAdornment: (
          <InputAdornment position="start">
            <MdManageSearch className="text-primary mr-px my-px" size={26} />
          </InputAdornment>
        ),

        endAdornment: value && (
          <IconButton
            aria-label="toggle password visibility"
            className="!p-0"
            onClick={() => onChangeInput("")}
          >
            <MdClear className="text-primary mr-px my-px" size={16} />
          </IconButton>
        ),
      }}
    />
  );
};

export default SearchInput;
