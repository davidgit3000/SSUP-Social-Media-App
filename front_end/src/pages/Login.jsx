import { Stack, TextField, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../assets/logo.png";

function Login() {
  return (
    <>
      <Stack
        direction={"row"}
        spacing={10}
        className="justify-center my-20 mx-2"
      >
        <div className="py-10 w-1/2 md:w-96">
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
        </div>

        <div className="bg-[#B3F992] p-3 w-1/2 md:w-96">
          <h2 className="text-4xl font-bold text-center">Login</h2>
          <div className="mt-4">
            <TextField
              id="username"
              label="Username"
              variant="filled"
              fullWidth
              className="bg-slate-100 rounded-md"
            />
          </div>
          <div className="mt-4">
            <TextField
              type="password"
              id="pwd"
              label="Password"
              variant="filled"
              fullWidth
              className="bg-slate-100 rounded-md"
            />
          </div>
          <div className="mt-4">
            <Button
              variant="contained"
              style={{ background: "#4CCC51" }}
              fullWidth
            >
              Log in
            </Button>
          </div>
          <div className="mt-4">
            <Button
              variant="contained"
              style={{ background: "#4CCC51" }}
              fullWidth
              href="/signup"
            >
              Create new account
            </Button>
          </div>
          <div className="mt-4">
            <hr className="border-black" />
          </div>
          <div className="mt-4">
            <Button
              variant="contained"
              style={{ background: "#4CCC51" }}
              fullWidth
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
          </div>
        </div>
      </Stack>
    </>
  );
}

export default Login;
