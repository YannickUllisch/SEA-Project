import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSubmit = () => {
    // We send the login request to the backend where is is verified.
    window.ipc.send('authenticate', { username, password })

    // IMPLEMENT: Channel should return error on auth failure!
    // window.ipc.on('authenticate', (message: string) => {
    //   console.log(message)
    // })
  }

  return (
    <Box>
      <Typography component="h1" variant="h5" className="text-red-500">
        Sign in
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        onChange={(e) => setUsername(e.currentTarget.value)}
        name="username"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        onChange={(e) => setPassword(e.currentTarget.value)}
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >
        Sign In
      </Button>
    </Box>
  )
}

export default LoginForm
