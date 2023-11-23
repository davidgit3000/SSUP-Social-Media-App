import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Grid,
  CssBaseline,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import logo from "../assets/logo.png";
import { deepOrange, red } from "@mui/material/colors";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    nav_link: {
      main: "#ffffff",
    },
    nav_bar: {
      main: "#78C43B",
    },
  },
});

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const navigate = () => {
  //   <Navigate to="/signin" />;
  // };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar color="nav_bar">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Grid
                container
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
              >
                <Grid item>
                  <div>
                    <img src={logo} className="w-12 mr-3 rounded-md" />
                  </div>
                </Grid>
                <Grid>
                  <div className="mx-1">
                    <Typography
                      variant="h5"
                      className="font-extrabold"
                      noWrap
                      component="a"
                      href="/"
                    >
                      SSUP
                    </Typography>
                  </div>
                </Grid>
                <Grid item>
                  <div className="mx-3">
                    <TextField
                      id="input-with-icon-textfield"
                      placeholder="Search"
                      type="search"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                      margin="dense"
                    />
                  </div>
                </Grid>
              </Grid>

              <div className="mx-1">
                <Button
                  variant="text"
                  color="nav_link"
                  className="hover:bg-black"
                >
                  Connections
                </Button>
              </div>
              <div className="mx-1">
                <Button variant="text" color="nav_link">
                  Messages
                </Button>
              </div>
              <div className="mx-1">
                <Button variant="text" color="nav_link">
                  Notifications
                </Button>
              </div>
              <div className="mx-1">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  {" "}
                  <Avatar
                    sx={{ width: 32, height: 32, bgcolor: deepOrange[500] }}
                  >
                    DL
                  </Avatar>
                </IconButton>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>

      {/** Source: https://mui.com/material-ui/react-menu/ - Account menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: deepOrange[500] }} />
          My Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Button
            sx={{ color: "black", textTransform: "none", fontSize: "15px" }}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            sx={{ color: "red", textTransform: "none", fontSize: "15px" }}
            href="/signin"
          >
            <ListItemIcon fontSize="small">
              <Logout />
            </ListItemIcon>
            Log out
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
}
