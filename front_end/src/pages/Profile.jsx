import React, { useState } from "react";
import ImageBanner from "../components/ProfileComponents/ImageBanner";
import UserAvatar from "../components/ProfileComponents/UserAvatar";
import InfoCard from "../components/ProfileComponents/InfoCard";
import { useParams } from "react-router-dom";
import { CssBaseline, Stack } from "@mui/material";
import NavBar from "../components/NavBar";

export default function Profile() {
  const { param } = useParams();
  const [infoCards, setInfoCards] = useState([]);

  const handleAddMore = (title, content) => {
    const newInfoCard = {
      title,
      content,
    };
    setInfoCards([...infoCards, newInfoCard]);
  };

  return (
    <>
      <CssBaseline />
      <div className="mt-10">
        <NavBar user={param} />
      </div>
      <Stack spacing={10}>
        <Stack>
          <ImageBanner imageUrl="https://pbs.twimg.com/media/Ev-lsOYXYAkhxk6.jpg">
            <UserAvatar
              imageUrl="https://i.pinimg.com/1200x/44/18/5e/44185e2c03bd66a730d933e0cbb2065b.jpg"
              username={param}
            />
          </ImageBanner>
        </Stack>
        {/* Add spacing between the username and the first InfoCard */}
        <Stack spacing={2}>
          {/* Hardcoded InfoCards */}
          <InfoCard
            title="About me"
            content="Your about me content goes here"
          />
          <InfoCard
            title="Education"
            content="Your education content goes here"
          />
          <InfoCard
            title="Work Experience"
            content="Your experience content goes here"
          />
          <InfoCard
            title="Projects"
            content="Your projects content goes here"
          />

          {/* Dynamic InfoCards */}
          {/* {infoCards.map((infoCard, index) => (
            <InfoCard
              key={index}
              title={infoCard.title}
              content={infoCard.content}
              onAddMore={handleAddMore}
            />
          ))} */}
        </Stack>
      </Stack>
    </>
  );
}
