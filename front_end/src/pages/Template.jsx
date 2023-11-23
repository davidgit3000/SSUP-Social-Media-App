import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { Stack } from "@mui/material";

export default function Template() {
  const [names, setNames] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // const axios = require("axios");
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/")
      .then((res) => {
        let data = res.data;
        setNames(data);
      })
      .catch((err) => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("submit");
    axios
      .post("http://localhost:8000/api/", {
        firstname: firstName,
        lastname: lastName,
      })
      .then((res) => {
        setFirstName("");
        setLastName("");
      })
      .catch((err) => {});
  };

  return (
    <>
      <Stack spacing={5}>
        <div className="absolute">
          <NavBar />
        </div>
        <Stack className="text-left relative top-10 md:top-1" spacing={2}>
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="fname">First name: </label>
              <input
                type="text"
                placeholder="Enter your first name"
                name="fname"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <br />
              <label htmlFor="lname">Last name: </label>
              <input
                type="text"
                placeholder="Enter your last name"
                name="lname"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <button
                type="submit"
                className="bg-sky-400 hover:bg-sky-500 p-1 rounded"
              >
                Submit
              </button>
            </form>
          </div>
          <div>
            {names.map((name1, id) => (
              <div key={id}>
                <p>First name: {name1.firstname}</p>
                <p>Last name: {name1.lastname}</p>
                <br />
              </div>
            ))}
          </div>
        </Stack>
      </Stack>

      {/* http://localhost:8000/res/ */}
    </>
  );
}
