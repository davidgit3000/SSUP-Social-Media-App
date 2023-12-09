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
import { Editor } from "@tinymce/tinymce-react";

export default function StatusPostButton({ username }) {
  const [open, setOpen] = useState(false);
  const [statusContent, setStatusContent] = useState("");

  const handleStatusContent = () => {
    const editorContent = tinymce.activeEditor.getContent({ format: "html" });
    setStatusContent(editorContent);
  };

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
          <DialogContent dividers sx={{ height: "220px" }}>
            <div data-text-editor="name">
              <Editor
                apiKey="shdp0h85t0cyv06fmz4x58r777hx22to94bsc6zwcdnv3rc3"
                init={{
                  plugins:
                    "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                  ai_request: (request, respondWith) =>
                    respondWith.string(() =>
                      Promise.reject("See docs to implement AI Assistant")
                    ),
                }}
                value={statusContent}
                onEditorChange={handleStatusContent}
              />
            </div>
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
