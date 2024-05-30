import React, { useState } from 'react'
import { Button, TextField, Box } from '@mui/material'
import { useRouter } from 'next/router'
import theme from '../lib/theme'

interface ValidationResponse {
  valid: boolean
  rCode: boolean
}
// State to keep track of the entered code
const Restart = () => {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  // Function to handle the redirection to the participant's homepage
  const handleRedirect = () => {
    window.ipc.send('validateRestartCode', {
      experimentId: router.query.executedExperiment as string,
      restartCode: code,
    })

    window.ipc.on('restartCodeValidated', (response: ValidationResponse) => {
      if (response.valid) {
        router.push({
          pathname: '/participant',
          query: {
            executedExperiment: router.query.executedExperiment as string,
          },
        })
        setCode('')
      } else {
        setError('Invalid restart code. Please try again.')
      }
    })

    window.ipc.on('failValidateRestartCode', () => {
      setError('An error occurred. Please try again later.')
    })

    return () => {
      window.ipc.removeAllListeners('restartCodeValidated')
      window.ipc.removeAllListeners('failValidateRestartCode')
    }
  }

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
      {code !== '' && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleRedirect}
          sx={{ marginTop: 1, color: 'white' }}
        >
          Restart Experiment
        </Button>
      )}
    </Box>
  )
  //    }
  //  })
}

export default Restart
