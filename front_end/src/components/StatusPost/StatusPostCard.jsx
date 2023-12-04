import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogActions,
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
  Delete,
} from "@mui/icons-material";
import axios from "axios";

export default function StatusPostCard({
  id,
  owner,
  username,
  content,
  image,
  user,
  date,
  likes,
  liked,
  isFollowing,
  comments,
  shares,
  bookmarks,
  onShareClick,
}) {
  // State for tracking whether the post is liked and the number of likes
  const [isOwner, setUserName] = useState(owner);
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likes);
  const [following, setFollowing] = useState(isFollowing);
  const [saved, setSaved] = useState(false);
  const [savedCount, setSavedCount] = useState(bookmarks);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickDelete = () => {
    setOpen(true);
  };

  const handleCloseDelete = () => {
    setOpen(false);
  };

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/post_status/id=${id}`
      );

      if (response.status == 204) {
        console.log("Post deleted successfully");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error while deleteing post: ", error);
    }
  };

  // Split the user name (first name and last name) -
  const userSplit = user.split(" ");

  // Handler for toggling the like state and updating the like count
  const handleLikeClick = async () => {
    try {
      const updatedLikeState = !isLiked;
      setIsLiked(updatedLikeState);

      await axios.post(`http://localhost:8000/api/post_status/id=${id}`, {
        numLikes: updatedLikeState ? likeCount + 1 : likeCount - 1,
        isLiked: updatedLikeState,
        isFollowing: following,
      });

      setLikeCount(updatedLikeState ? likeCount + 1 : likeCount - 1);
    } catch (error) {
      console.error("Error handling Like click: ", error);
    }
  };

  // Handler for toggling the follow state
  const handleFollowClick = async () => {
    try {
      const updatedFollowingState = !following;
      setFollowing(updatedFollowingState);

      await axios.post(`http://localhost:8000/api/post_status/id=${id}`, {
        numLikes: likeCount,
        isLiked: isLiked,
        isFollowing: updatedFollowingState,
      });
    } catch (error) {
      console.error("Error handling Follow click: ", error);
    }
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

  const getRandomColor = () => {
    // Generate random RGB values
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Create a CSS color string from the RGB values
    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <>
      <Card sx={{ borderRadius: "10px", backgroundColor: "#fafaf9" }}>
        <CardHeader
          title={<Typography>{user}</Typography>}
          subheader={
            <>
              <Stack direction={"row"} spacing={0.5}>
                <Public sx={{ fontSize: 20 }} />
                <Typography variant="body2">| {date}</Typography>
              </Stack>
            </>
          }
          action={
            !isOwner ? (
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
            ) : (
              ""
            )
          }
          avatar={
            <Avatar
              sx={{
                backgroundColor: getRandomColor(),
              }}
            >
              {userSplit[0].charAt(0) + userSplit[1].charAt(0)}
            </Avatar>
          }
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
                {isLiked ? (
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
            {isOwner ? (
              <IconButton onClick={handleClickDelete}>
                <Delete sx={{ color: "red" }} />
              </IconButton>
            ) : (
              ""
            )}
          </Grid>
        </CardActions>

        {/** Dialog for asking for delete consent */}
        <Dialog open={open}>
          <DialogTitle>{"Are you sure to remove this post?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleDeletePost}>Yes</Button>
            <Button onClick={handleCloseDelete}>Cancel</Button>
          </DialogActions>
        </Dialog>

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
                  sx={{ borderRadius: "10px" }}
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
