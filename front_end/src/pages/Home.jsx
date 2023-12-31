import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import LeftPanel from "../components/LeftPanel";
import StatusPostButton from "../components/StatusPost/StatusPostButton";
import StatusPostCard from "../components/StatusPost/StatusPostCard";
import { Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../components/Authentication/AuthContext";
import NotFound from "./NotFound";
import OnlineUsersView from "../components/OnlineStat/OnlineUsersView";
import axios from "axios";

export default function Home() {
  const { param } = useParams();
  const navigate = useNavigate();
  const { hasAccessToken, logout } = useAuth();
  const localUsername = localStorage.getItem("username");
  const tokenExpiration = localStorage.getItem("exp_time");
  const expirationTime = new Date(tokenExpiration).getTime();
  const [posts, setPosts] = useState([]);

  if (localUsername !== param) {
    return <NotFound />;
  }

  useEffect(() => {
    async function handleLogout() {
      if (tokenExpiration) {
        const currentTime = new Date().getTime();
        // console.log("Exp time: ", expirationTime);
        // console.log("Current time: ", currentTime);
        if (expirationTime < currentTime) {
          await axios.post("http://localhost:8000/api/logout", {
            username: param,
          });
          logout();
          navigate("/login");
        }
      }
    }

    handleLogout();
  }, [expirationTime]);

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/`);
        setPosts(response.data);
        // console.log(response.data[0]);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Stack spacing={{ xs: 9, sm: 10, md: 5 }}>
        <div className="bg-black w-1/2 xs:w-1/3">
          <NavBar user={param} />
        </div>

        <Stack
          direction={"row"}
          className="relative top-6 md:top-5"
          spacing={1}
        >
          <LeftPanel />

          <div className="w-1/2 sm:w-3/4 p-3 bg-[#E8F7BC]">
            <Stack spacing={2} className="relative top-3">
              <div>
                <StatusPostButton username={param} />
              </div>
              <div className="px-2 text-lg md:text-2xl font-bold">
                Your feeds
              </div>
              {posts.map((post) => (
                <div key={post.id}>
                  <StatusPostCard
                    owner={post.username == param}
                    id={post.id}
                    user={post.firstname + " " + post.lastname}
                    date={post.datePosted}
                    content={post.content}
                    likes={post.numLikes}
                    liked={post.isLiked}
                    isFollowing={post.isFollowing}
                    comments={post.numComments}
                    shares={post.numShares}
                  />
                </div>
              ))}
            </Stack>
          </div>
          <div className="w-1/2 md:w-1/4 p-3 bg-[#D5E6E7]">
            <OnlineUsersView />
          </div>
        </Stack>
      </Stack>
    </>
  );
}
