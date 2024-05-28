import React, { useState } from 'react'
import { Button, TextField, Box } from '@mui/material'
import { useRouter } from 'next/router'

interface ValidationResponse {
  valid: boolean
  rCode: boolean
}
// State to keep track of the entered code
const Restart = ({ experimentId, redirectToHomePage }) => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  // Function to handle the redirection to the participant's homepage
  const handleRedirect = () => {
    window.ipc.send('validateRestartCode', { experimentId, restartCode: code })

    window.ipc.on('restartCodeValidated', (response: ValidationResponse) => {
      if (response.valid) {
        redirectToHomePage()
        setCode('')
      } else {
        setError('Invalid restart code. Please try again.')
      }
    })

    window.ipc.on('failValidateRestartCode', (message) => {
      setError('An error occurred. Please try again later.')
    })
  }

  //window.ipc.on('noRestartCode', (response: ValidationResponse) => {
  //  if (response.rCode === false) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 2,
      }}
    >
      <TextField
        label="Enter Reset Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        error={!!error}
        helperText={error}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleRedirect}
        sx={{ marginTop: 1 }}
      >
        Go to Home Page
      </Button>
    </Box>
  )
  //    }
  //  })
}

export default Restart
