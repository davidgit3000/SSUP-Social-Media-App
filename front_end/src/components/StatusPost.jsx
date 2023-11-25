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
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import { useState } from "react";
import "./css/SelectMUI.css";

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
            />
          </DialogContent>
          <DialogActions>
            <Grid container direction={"row"} justifyContent={"flex-start"}>
              <Grid item md={3} xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="visibility">Visible to</InputLabel>
                  <Select labelId="visibility" label="Visible to" fullWidth>
                    <MenuItem>Public</MenuItem>
                    <MenuItem>Connections only</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Post</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
