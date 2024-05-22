import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { FormError } from './LoginError'

const LoginForm = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | undefined>('')

  const onSubmit = async () => {
    setError('') // We send the login request to the backend where is is verified.
    window.ipc.send('authenticate', { username, password })
    setPassword('')

    // IMPLEMENT: Channel should return error on auth failure!
    window.ipc.on('authenticate', (message: string) => {
      setError(message)
    })
    window.ipc.on('authenticated', (_message: string) => {
      setUsername('')
      setPassword('')
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <Box>
      <Typography component="h1" variant="h5" className="text-red-500">
        Sign in
      </Typography>
      <TextField
        id="username"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
        name="username"
        autoFocus
        onKeyDown={handleKeyDown}
      />
      <TextField
        id="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        value={password}
        name="password"
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.currentTarget.value)}
        autoComplete="current-password"
        onKeyDown={handleKeyDown}
      />
      <FormError message={error} />
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
