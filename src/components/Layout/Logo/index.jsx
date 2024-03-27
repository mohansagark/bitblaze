import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";

const Logo = () => {
  return (
    <>
      <AdbIcon className="text-primary flex" />
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
        LOGO
      </Typography>
    </>
  );
};

export default Logo;
