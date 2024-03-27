import Typography from "@mui/material/Typography";
import { FaCode } from "react-icons/fa6";

const Logo = () => {
  return (
    <>
      <FaCode size={36} className="text-primary flex mr-2" />
      <Typography
        variant="h6"
        noWrap
        component="a"
        className="text-primary"
        sx={{
          mr: 2,
          display: "flex",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          textDecoration: "none",
        }}
      >
        CODECRAFT
      </Typography>
    </>
  );
};

export default Logo;
