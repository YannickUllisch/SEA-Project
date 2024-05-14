import type React from "react";
import { type FC, useState } from "react";
import Dialog from "@mui/material/Dialog";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

interface CreateExperimentModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateExperimentModal: FC<CreateExperimentModalProps> = ({
  open,
  setOpen,
}) => {
  const [title, setTitle] = useState(""); // State for experiment title
  const [description, setDescription] = useState(""); // State for experiment description

  const handleClose = () => {
    setOpen(false);
    setTitle(""); // Reset title state on close
    setDescription(""); // Reset description state on close
  };

  const handleCreate = () => {
    window.ipc.send("createExperiment", { title, description });
    handleClose(); // Close the dialog after creating the experiment
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create a New Experiment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="titel"
          name="titel"
          label="Experiment Title"
          type="titel"
          fullWidth
          variant="standard"
          onChange={(e) => setTitle(e.currentTarget.value)} // Update the state on change
        />
        <TextField
          autoFocus
          margin="dense"
          id="Description"
          name="Description"
          label="Description"
          value={description}
          type="Description"
          fullWidth
          variant="standard"
          onChange={(e) => setDescription(e.currentTarget.value)} // Update the state on change
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleCreate} autoFocus>
          CREATE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateExperimentModal;
