import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import LeftPanel from "../components/LeftPanel";
import StatusPost from "../components/StatusPost";
import axios from "axios";
import { Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../components/Authentication/AuthContext";
import NotFound from "./NotFound";

export default function Home() {
  const { param } = useParams();
  const navigate = useNavigate();
  const { hasAccessToken, logout } = useAuth();
  const localUsername = localStorage.getItem("username");
  const currentTime = Date.now() / 1000;
  const expiration_time = localStorage.getItem("exp_time");

  if (localUsername !== param) {
    return <NotFound />;
  }

  if (expiration_time < currentTime) {
    console.log("Current time: ", currentTime);
    logout();
  }

  useEffect(() => {
    if (hasAccessToken()) {
      navigate(`/home/${param}`);
    }
  }, [hasAccessToken]);

  useEffect(() => {
    const handleUnauthenticatedAccess = () => {
      if (hasAccessToken()) {
        navigate(`/home/${param}`); // Redirect to Home page if already authenticated
      }
    };

    window.addEventListener("popstate", handleUnauthenticatedAccess);
    return () => {
      window.removeEventListener("popstate", handleUnauthenticatedAccess);
    };
  }, [hasAccessToken]);

  return (
    <>
      <Stack spacing={5}>
        <div>
          <NavBar user={param} />
        </div>
        <Stack
          direction={"row"}
          className="relative top-14 md:top-5"
          spacing={1}
        >
          <div>
            <LeftPanel />
          </div>
          <div className="w-3/4 bg-[#E8F7BC]">
            <Stack spacing={2} className="relative top-3">
              <div className="px-2">
                <StatusPost />
              </div>
              <div className="px-2 text-lg md:text-2xl font-bold">
                Your feeds
              </div>
              <div className="px-2">----- Display posts here -----</div>
            </Stack>
          </div>
          <div className="w-1/4 bg-[#D5E6E7]"></div>
        </Stack>
      </Stack>

      {/* SnackBar (short notifications), Badge, Tooltip, Floating Action Button, Dialog, Card,
      Drawer(for Notifications Tab) */}
      {/* http://localhost:8000/res/ */}
    </>
  );
}
