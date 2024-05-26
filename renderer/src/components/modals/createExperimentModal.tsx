import React, { FC, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material'

interface CreateExperimentModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateExperimentModal: FC<CreateExperimentModalProps> = ({
  open,
  setOpen,
}) => {
  const [title, setTitle] = useState('') // State for experiment title
  const [description, setDescription] = useState('') // State for experiment description
  const [restartCode, setRestartCode] = useState('') // State for restart code

  const handleClose = () => {
    setOpen(false)
    setTitle('') // Reset title state on close
    setDescription('') // Reset description state on close
    setRestartCode('') // Reset restart code state on close
  }

  const handleCreate = () => {
    window.ipc.send('createExperiment', { title, description, restartCode })
    handleClose() // Close the dialog after creating the experiment
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create a New Experiment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Experiment Title"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)} // Update the state on change
        />
        <TextField
          margin="dense"
          id="description"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)} // Update the state on change
        />
        <TextField
          margin="dense"
          id="restartCode"
          name="restartCode"
          label="Restart Code"
          type="text"
          fullWidth
          variant="standard"
          value={restartCode}
          onChange={(e) => setRestartCode(e.currentTarget.value)} // Update the state on change
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleCreate} autoFocus>
          CREATE
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateExperimentModal
