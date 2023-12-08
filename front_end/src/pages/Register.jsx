import {
  Stack,
  TextField,
  Button,
  Container,
  Box,
  FormControl,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    // Perform validation
    // (check if input password and its confirmation match each other)
    try {
      const response = await axios.post(
        "http://localhost:8000/api/signup",
        formData
      );

      if (response.status === 201) {
        console.log("Signup successful");
        setOpen(true);
        setTimeout(navigate("/login"), 4000);
      } else {
        console.log("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup: ", error);
    }
  };

  return (
    <>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={6}
        className="justify-center my-16"
      >
        <Container maxWidth="xs" className="py-10">
          <img
            src={logo}
            alt="logo"
            className="mx-auto mb-2 my-32 md:my-10 rounded-lg shadow-2xl w-20 md:w-44"
          />
          <h1 className="text-3xl text-center md:text-5xl text-white font-bold">
            SSUP
          </h1>
          <h2 className="text-xs text-center md:text-2xl italic">
            Smart - Strong - Unique - Productive
          </h2>
          <p className="text-sm text-center md:text-lg md:text-lg">
            Connect with friends and draw your future
          </p>
        </Container>

        <Container maxWidth="sm">
          <Box bgcolor={"#B3F992"} sx={{ padding: 2 }}>
            <h2 className="mb-4 text-2xl md:text-4xl font-bold text-center">
              Create new account
            </h2>

            <form
              method="post"
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1em",
              }}
            >
              <Stack direction={"row"} spacing={2}>
                <TextField
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  label="First Name"
                  variant="filled"
                  className="bg-slate-100 rounded-md"
                  fullWidth
                  onChange={handleInputChange}
                />
                <TextField
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  label="Last Name"
                  variant="filled"
                  className="bg-slate-100 rounded-md"
                  fullWidth
                  onChange={handleInputChange}
                />
              </Stack>
              <TextField
                type="email"
                name="email"
                value={formData.email}
                label="Email"
                variant="filled"
                fullWidth
                className="bg-slate-100 rounded-md"
                onChange={handleInputChange}
              />
              <TextField
                type="text"
                name="username"
                value={formData.username}
                label="Username"
                variant="filled"
                fullWidth
                className="bg-slate-100 rounded-md"
                onChange={handleInputChange}
              />
              <TextField
                type="password"
                name="password"
                value={formData.password}
                label="Password"
                variant="filled"
                fullWidth
                className="bg-slate-100 rounded-md"
                onChange={handleInputChange}
              />

              <TextField
                type="password"
                name="confirm_password"
                id="conf_pwd"
                label="Confirm your password"
                variant="filled"
                fullWidth
                className="bg-slate-100 rounded-md"
              />

              <Button
                type="submit"
                variant="contained"
                style={{ background: "#4CCC51" }}
                fullWidth
              >
                Sign up
              </Button>
            </form>
          </Box>
        </Container>
      </Stack>
      <Snackbar
        open={open}
        message={"Account created successfully"}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
