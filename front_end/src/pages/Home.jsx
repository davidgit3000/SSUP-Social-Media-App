import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { Stack } from "@mui/material";

export default function Home() {
  return (
    <>
      <Stack spacing={5}>
        <div className="absolute">
          <NavBar />
        </div>
        <Stack className="text-left relative top-10 md:top-1" spacing={2}>
          <div>hello</div>
        </Stack>
      </Stack>

      {/* http://localhost:8000/res/ */}
    </>
  );
}
