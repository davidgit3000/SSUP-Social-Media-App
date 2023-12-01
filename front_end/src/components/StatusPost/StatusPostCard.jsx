import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Avatar,
  IconButton,
  CardHeader,
  Stack,
  Divider,
  Collapse,
  Grid,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Share,
  Comment,
  MoreHoriz,
  BookmarkBorder,
  Bookmark,
  Public,
} from "@mui/icons-material";

export default function StatusPostCard({
  content,
  image,
  user,
  date,
  likes,
  comments,
  shares,
  bookmarks,
  onShareClick,
}) {
  // State for tracking whether the post is liked and the number of likes
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [following, setFollowing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedCount, setSavedCount] = useState(bookmarks);
  const [expanded, setExpanded] = useState(false);

  // Handler for toggling the like state and updating the like count
  const handleLikeClick = () => {
    if (liked) {
      // If already liked, decrement the like count by 1
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      // If not liked, increment the like count by 1
      setLikeCount((prevCount) => prevCount + 1);
    }
    // Toggle the liked state
    setLiked(!liked);
  };

  // Handler for toggling the follow state
  const handleFollowClick = () => {
    setFollowing(!following);
  };

  // Handle expand click
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSaved = () => {
    {
      saved
        ? setSavedCount((prev) => prev - 1)
        : setSavedCount((prev) => prev + 1);
    }
    setSaved(!saved);
  };

  return (
    <>
      <Card sx={{ borderRadius: "10px", backgroundColor: "#fafaf9" }}>
        <CardHeader
          title={<Typography>David Lam</Typography>}
          subheader={
            <>
              <Stack direction={"row"} spacing={0.5}>
                <Public sx={{ fontSize: 20 }} />
                <Typography variant="body2">| 2 hours ago</Typography>
              </Stack>
            </>
          }
          action={
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4CCC51",
                ":hover": {
                  backgroundColor: "darkgreen",
                },
              }}
              onClick={handleFollowClick}
            >
              {following ? "Following" : "Follow"}
            </Button>
          }
          avatar={<Avatar sx={{ backgroundColor: "red" }}>DL</Avatar>}
        />
        <CardContent>
          <Typography variant="body1" color={"text.primary"}>
            {content}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions disableSpacing>
          <Grid container justifyContent={"space-between"} direction={"row"}>
            <Stack direction={"row"}>
              <IconButton onClick={handleLikeClick}>
                {liked ? (
                  <Favorite sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorder sx={{ color: "red" }} />
                )}
                <Typography sx={{ marginLeft: "4px" }} variant="body2">
                  {likeCount}
                </Typography>
              </IconButton>
              <IconButton onClick={handleExpandClick}>
                <Comment sx={{ color: "blue" }} />
                <Typography sx={{ marginLeft: "4px" }} variant="body2">
                  {comments}
                </Typography>
              </IconButton>
              <IconButton>
                <Share sx={{ color: "green" }} />
                <Typography sx={{ marginLeft: "4px" }} variant="body2">
                  {shares}
                </Typography>
              </IconButton>
              <IconButton onClick={handleSaved}>
                {saved ? <Bookmark /> : <BookmarkBorder />}
                <Typography sx={{ marginLeft: "4px" }} variant="body2">
                  {savedCount}
                </Typography>
              </IconButton>
            </Stack>
          </Grid>
        </CardActions>

        {/* Collapse section for comments */}
        <Collapse in={expanded} unmountOnExit timeout={"auto"}>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction={"row"} spacing={1}>
                <Avatar>JS</Avatar>
                <Stack className="p-2 rounded-lg bg-slate-400">
                  <Typography sx={{ fontWeight: "bold" }}>
                    John Smith
                  </Typography>
                  <Typography variant="body1">Hello David!</Typography>
                </Stack>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Avatar>EM</Avatar>
                <Stack className="p-2 rounded-lg bg-slate-400">
                  <Typography sx={{ fontWeight: "bold" }}>Elon Musk</Typography>
                  <Typography variant="body1">
                    Hello World! My name is Elon Musk
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              <form>
                <TextField
                  variant="filled"
                  placeholder="Type your comment here"
                  fullWidth
                  sx={{borderRadius: "10px"}}
                  className="bg-green-100 rounded-md"
                />
              </form>
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
