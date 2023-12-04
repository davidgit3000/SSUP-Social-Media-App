import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import { useEffect, useState } from "react";
import "../css/SelectMUI.css";
import axios from "axios";

export default function StatusPostButton({ username }) {
  const [open, setOpen] = useState(false);
  const [statusContent, setStatusContent] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostSubmit = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/username=${username}`
      );

      await axios.post("http://localhost:8000/api/posts/", {
        content: statusContent,
        user_id: response.data[0].id,
        username: response.data[0].username,
        firstname: response.data[0].firstname,
        lastname: response.data[0].lastname,
      });

      handleClose();
      setStatusContent("");
      window.location.reload();
    } catch (error) {
      console.error("Error while posting a status: ", error);
    }
  };

  return (
    <>
      <div className="rounded-md shadow-lg shadow-sky-500 hover:shadow-sky-600">
        <Button
          variant="contained"
          fullWidth
          startIcon={<TipsAndUpdatesRoundedIcon />}
          onClick={handleClickOpen}
        >
          Post your thoughts or ideas here
        </Button>

        <Dialog open={open} fullWidth>
          <DialogTitle>What's on your mind?</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
          <DialogContent dividers>
            <DialogContentText>
              Enter your thoughts or ideas here...
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="post"
              placeholder="Post here..."
              type="text"
              fullWidth
              variant="filled"
              multiline
              rows={5}
              value={statusContent}
              onChange={(e) => setStatusContent(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Grid container direction={"row"} justifyContent={"flex-start"}>
              <Grid item md={4} xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="visibility">Visible to</InputLabel>
                  <Select labelId="visibility" label="Visible to" fullWidth>
                    <MenuItem>Public</MenuItem>
                    <MenuItem>Connections only</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Stack direction={"row"} spacing={2}>
              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                onClick={handlePostSubmit}
              >
                Post
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
