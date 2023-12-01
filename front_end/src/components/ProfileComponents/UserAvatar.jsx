import React from "react";
import { Avatar as MUIAvatar, Stack, Typography } from "@mui/material";

export default function UserAvatar({ imageUrl, username }) {
  return (
    <Stack className="relative top-28">
      <MUIAvatar
        alt="Profile Avatar"
        src={imageUrl}
        sx={{
          width: { sm: 80, md: 100 },
          height: { sm: 80, md: 100 },
        }}
      />
      <Typography variant="h6" alignItems={"center"}>
        {username}
      </Typography>
    </Stack>
  );
}
