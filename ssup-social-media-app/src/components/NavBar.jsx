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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../assets/logo.png";

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
                <Button variant="text" color="nav_link">
                  Profile
                </Button>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
}
