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
import { useEffect, useState } from "react";
import { useAuth } from "./Authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

export default function NavBar({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const { logout } = useAuth();
  const [fname, setFName] = useState("");
  const [lnam, setLName] = useState("");
  const { hasAccessToken } = useAuth();
  const localToken = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/username=${user}`, {
        headers: {
          Authorization: `Bearer ${localToken}`,
        },
      })
      .then((res) => {
        setFName(res.data[0].firstname);
        setLName(res.data[0].lastname);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }, [hasAccessToken]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/logout", { username: user });
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error.response.data);
    }
  };

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
                    <Button href={`/home/${user}`}>
                      <img src={logo} className="w-10 md:w-12 rounded-md" />
                    </Button>
                  </div>
                </Grid>
                <Grid>
                  <div className="mx-1">
                    <Typography
                      variant="h5"
                      className="font-extrabold"
                      noWrap
                      component="a"
                      href={`/home/${user}`}
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
                <Button variant="text" color="nav_link">
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
                  sx={{
                    ml: 2,
                    color: "white",
                    fontWeight: "700",
                    ":hover": { background: "lightgreen", color: "black" },
                  }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  {user}
                  {/* <Avatar
                    sx={{ width: 32, height: 32, bgcolor: deepOrange[500] }}
                  >
                    {user}
                  </Avatar> */}
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
        <MenuItem
          onClick={() => {
            navigate(`/profile/${user}`);
          }}
        >
          <Avatar sx={{ width: 32, height: 32, bgcolor: deepOrange[500] }} />
          {fname} {lnam}
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
            onClick={handleLogout}
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
