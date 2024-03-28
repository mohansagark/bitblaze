import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import UserProfile from "../UserProfile";
import { Popover } from "@mui/material";
import Logo from "../Logo";
import CustomMenu from "../Menu";
import { useMenu } from "../../../helpers/hooks";

function Header({ showLogo = false }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { menu, sidebarWidth } = useMenu();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      className="bg-background"
      sx={{
        boxShadow: "none",
        width: menu ? `calc(100% - ${sidebarWidth})` : "100%",
        transition: "width 400ms ease",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex justify-between">
          <Box className="flex justify-center items-center gap-2">
            <CustomMenu />
          </Box>
          {showLogo && (
            <Box className="flex justify-center items-center gap-2">
              <Logo />
            </Box>
          )}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="My Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Mohansagar"
                  className="bg-primary"
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Popover
              id={Boolean(anchorElUser) ? "simple-popover" : undefined}
              open={Boolean(anchorElUser)}
              anchorEl={anchorElUser}
              slotProps={{ paper: { sx: { borderRadius: 2.5 } } }}
              className="mt-2 rounded-[10px]"
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <UserProfile closeUserProfile={handleCloseUserMenu} />
            </Popover>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
