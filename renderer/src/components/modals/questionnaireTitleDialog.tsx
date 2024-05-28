import type React from 'react'
import { type FC, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material'

interface QuestionnaireTitleProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSave: (title: string) => void // Function to call on save
  initialTitle?: string // Optional initial title
}

const QuestionnaireTitleDialog: FC<QuestionnaireTitleProps> = ({
  open,
  setOpen,
  onSave,
  initialTitle = '',
}) => {
  const [title, setTitle] = useState(initialTitle) // State for experiment title

  const handleClose = () => {
    setOpen(false)
    setTitle('') // Reset title state on close
  }

  const handleCreate = () => {
    onSave(title)
    handleClose() // Close the dialog after creating the experiment
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiDialog-paper': { width: '60%', maxWidth: 'none' } }}
    >
      <DialogTitle>Set Title</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="titel"
          name="titel"
          label="Questionnaire Title"
          type="titel"
          fullWidth
          variant="standard"
          onChange={(e) => setTitle(e.currentTarget.value)} // Update the state on change
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleCreate} autoFocus>
          SAVE
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default QuestionnaireTitleDialog
