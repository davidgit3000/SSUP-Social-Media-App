import {
  Stack,
  TextField,
  Button,
  Container,
  Box,
  Divider,
  FormControl,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let isAuthenticated;

  useEffect(() => {
    if (isAuthenticated) {
      console.log(isAuthenticated);
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        username: username,
        password: password,
      });

      console.log(response.data);

      if (response.status === 200) {
        isAuthenticated = true;
        const { token } = response.data;
        // Store the token securely in the local storage
        localStorage.setItem("token", token);
        console.log("Login successful. Token: ", token);

        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed: ", error.response.data);
    }
  };

  return (
    <>
      <Stack direction={"row"} spacing={6} className="justify-center my-24">
        <Container maxWidth="xs" className="py-10">
          <img
            src={logo}
            alt="logo"
            className="mx-auto mb-2 my-10 md:my-2 rounded-lg shadow-2xl w-20 md:w-44"
          />
          <h1 className="text-3xl md:text-5xl text-white text-center font-bold">
            SSUP
          </h1>
          <h2 className="text-md md:text-2xl text-center italic">
            Smart - Strong - Unique - Productive
          </h2>
          <p className="text-sm text-center md:text-lg md:text-lg">
            Connect with friends and draw your future
          </p>
        </Container>

        <Container maxWidth="xs">
          <Box bgcolor={"#B3F992"} sx={{ padding: 2 }}>
            <h2 className="mb-4 text-4xl font-bold text-center">Login</h2>

            <form
              method="post"
              onSubmit={handleLogin}
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1em",
              }}
            >
              <TextField
                id="username"
                label="Username"
                variant="filled"
                fullWidth
                className="bg-slate-100 rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                type="password"
                id="pwd"
                label="Password"
                variant="filled"
                fullWidth
                className="bg-slate-100 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                style={{ background: "#4CCC51" }}
                fullWidth
              >
                Log in
              </Button>

              <Button
                variant="contained"
                style={{ background: "#4CCC51" }}
                fullWidth
                href="/signup"
              >
                Create new account
              </Button>
              <Divider />
              <Button
                variant="contained"
                style={{ background: "#4CCC51" }}
                fullWidth
                startIcon={<GoogleIcon />}
              >
                Sign in with Google
              </Button>
            </form>
          </Box>
        </Container>
      </Stack>
    </>
  );
}

export default Login;
