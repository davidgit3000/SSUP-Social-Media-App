import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import { useState } from "react";

export default function StatusPost() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          Post your thoughts or ideas here...
        </Button>
        <Dialog open={open} fullWidth>
          <DialogTitle>What's on your mind?</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter your thoughts or ideas here...</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="post"
              label="Post here..."
              type="text"
              fullWidth
              variant="filled"
              multiline
              rows={5}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Post</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
