import type React from 'react'
import { type FC, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import bcrypt from 'bcryptjs'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material'

interface AddUserDialogProps {
  open: boolean
  roleToAdd: number
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  experimentId?: string
}

const AddUserDialog: FC<AddUserDialogProps> = ({
  open,
  setOpen,
  roleToAdd,
  experimentId,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClose = () => {
    setOpen(false)
    setUsername('') // Reset title state on close
    setPassword('') // Reset description state on close
  }

  const handleCreate = async () => {
    const hashedPassword = await bcrypt.hash(password, 10)
    window.ipc.send('addUser', {
      username,
      hashedPassword,
      roleToAdd,
      experimentId,
    })
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add User </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="Username"
          name="Username"
          label="Username"
          type="Username"
          fullWidth
          variant="standard"
          onChange={(e) => setUsername(e.currentTarget.value)} // Update the state on change
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="Password"
          name="Password"
          label="Password"
          type="Password"
          fullWidth
          variant="standard"
          onChange={(e) => setPassword(e.currentTarget.value)} // Update the state on change
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleCreate} autoFocus>
          ADD
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddUserDialog
