// InfoCard.js

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Tooltip,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import styled from "@emotion/styled";
import { Edit } from "@mui/icons-material";
import { Add } from "@mui/icons-material";

export default function InfoCard({ title, content }) {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [newTitle, setNewTitle] = useState(title);
  const [addContent, setAddContent] = useState("");

  const handleEditClick = () => {
    setEditContent(content);
    setNewTitle(title);
    setEditDialogOpen(true);
  };

  const handleAddMoreClick = () => {
    setAddDialogOpen(true);
  };

  const handleClose = () => {
    setAddDialogOpen(false);
    setEditDialogOpen(false);
  };

  const handleSaveClick = () => {
    // Use the addMoreFunction to update the content
    setEditContent((prevContent) =>
      addMoreFunction(newTitle, prevContent, addContent)
    );
    handleClose();
  };

  const handleAddDialogSave = () => {
    // Use the addMoreFunction to update the content
    setEditContent((prevContent) =>
      addMoreFunction(newTitle, prevContent, addContent)
    );
    handleClose();
  };

  const addMoreFunction = (title, prevContent, addContent) => {
    const updatedContent = `${prevContent}\n\n${addContent}`;
    console.log(`Save: Title - ${title}, Updated Content - ${updatedContent}`);
    return updatedContent;
  };

  // Placeholder function, replace it with your actual onAddMore implementation
  const defaultOnAddMore = (title, content) => {
    console.log(`Save: Title - ${title}, Content - ${content}`);
  };

  const textField = new Quill("#textfield");

  return (
    <>
      <Stack sx={{ background: "lightgreen", padding: "10px" }}>
        <Card>
          <CardHeader sx={{ color: "darkgreen" }} title={title} />

          <div className="ml-2">{editContent}</div>

          <div>
            <Stack
              direction={"row"}
              spacing={1}
              justifyContent={"end"}
              sx={{ padding: "5px" }}
            >
              <Tooltip title="Edit" arrow>
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="edit"
                  onClick={handleEditClick}
                >
                  <Edit />
                </Fab>
              </Tooltip>
              <Tooltip title="Add" arrow>
                <Fab size="small" color="primary" onClick={handleAddMoreClick}>
                  <Add />
                </Fab>
              </Tooltip>
            </Stack>
          </div>

          <Dialog open={isEditDialogOpen} onClose={handleClose} fullWidth>
            <DialogTitle>Edit InfoCard</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="About"
                placeholder="Write your bio here"
                multiline
                rows={10}
                fullWidth
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSaveClick} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={isAddDialogOpen} onClose={handleClose} fullWidth>
            <DialogTitle>Add New InfoCard</DialogTitle>
            <DialogContent>
              <TextField
                id="textfield"
                label="Title"
                variant="outlined"
                fullWidth
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <TextField
                label="Content"
                variant="outlined"
                fullWidth
                multiline
                rows={10}
                value={addContent}
                onChange={(e) => setAddContent(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddDialogSave} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Stack>
    </>
  );
}
