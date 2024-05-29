import type React from 'react'
import type { FC } from 'react'
import Dialog from '@mui/material/Dialog'
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'

interface DeleteExperimentModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  experimentId: string
}

const DeleteExperimentModal: FC<DeleteExperimentModalProps> = ({
  open,
  setOpen,
  experimentId,
}) => {
  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    window.ipc.send('deleteExperiment', { id: experimentId })
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-dialog-title"
    >
      <DialogTitle id="delete-dialog-title">{'Confirm Deletion'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this experiment?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose} sx={{ color: 'black' }}>
          No
        </Button>
        <Button
          variant="contained"
          onClick={handleDelete}
          color="error"
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteExperimentModal
