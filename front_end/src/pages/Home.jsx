import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import LeftPanel from "../components/LeftPanel";
import axios from "axios";
import { CssBaseline, Stack } from "@mui/material";

export default function Home() {
  return (
    <>
      <Stack spacing={5}>
        <div>
          <NavBar />
        </div>
        <Stack
          direction={"row"}
          className="relative top-14 md:top-5"
          spacing={1}
        >
          <div>
            <LeftPanel />
          </div>
          <div className="w-3/4 bg-[#E8F7BC]"></div>
          <div className="w-1/4 bg-[#D5E6E7]"></div>
        </Stack>
      </Stack>

      {/* http://localhost:8000/res/ */}
    </>
  );
}
