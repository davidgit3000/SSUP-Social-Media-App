import "./Register.css";
import { Stack, TextField, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../assets/logo.png";

export default function Register() {
  return (
    <>
      <Stack direction={"row"} spacing={30}>
        <div className="py-20 w-96 xs:w-80">
          <img
            src={logo}
            alt="logo"
            className="mx-auto mb-2 rounded-lg shadow-2xl w-44"
          />
          <h1 className="text-5xl text-white font-bold">SSUP</h1>
          <h2 className="text-sm md:text-2xl italic">
            Smart - Strong - Unique - Productive
          </h2>
          <p className="text-xs md:text-lg">
            Connect with friends and draw your future
          </p>
        </div>

        <div className="bg-[#B3F992] p-3 w-96">
          <h2 className="text-4xl font-bold">Create new account</h2>

          <div className="mt-3">
            <Stack direction={"row"} spacing={5}>
              <TextField
                id="first_name"
                label="First Name"
                variant="filled"
                className="bg-slate-100 rounded-md"
              />

              <TextField
                id="last_name"
                label="Last Name"
                variant="filled"
                className="bg-slate-100 rounded-md"
              />
            </Stack>
          </div>
          <div className="mt-4">
            <TextField
              id="email"
              label="Email"
              variant="filled"
              fullWidth
              className="bg-slate-100 rounded-md"
            />
          </div>
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
            <TextField
              type="password"
              id="c_pwd"
              label="Confirm your password"
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
              Sign up
            </Button>
          </div>
        </div>
      </Stack>
    </>
  );
}
