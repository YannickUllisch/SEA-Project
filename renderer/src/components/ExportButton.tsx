import React, { useState, useEffect } from 'react'
import { Button, Snackbar, Alert, type AlertColor, Box } from '@mui/material'
import { useRouter } from 'next/router'

const isElectron =
  typeof window !== 'undefined' &&
  typeof window.process !== 'undefined' &&
  window.process.type === 'renderer'

const ExportButton = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>('success')

  const router = useRouter()

  useEffect(() => {
    const handleGeneratedCSV = (_event, filePath) => {
      showNotification(`CSV file created at: ${filePath}`)
    }

    const handleFailGenerateCSV = (_event, errorMessage) => {
      showNotification(`Failed to create CSV file: ${errorMessage}`, 'error')
    }

    window.ipc.on('generatedCSV', handleGeneratedCSV)
    window.ipc.on('failGenerateCSV', handleFailGenerateCSV)

    return () => {
      window.ipc.removeAllListeners('generatedCSV')
      window.ipc.removeAllListeners('failGenerateCSV')
    }
  }, [])

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const showNotification = (
    message: string,
    severity: AlertColor = 'success',
  ) => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const downloadCSV = async () => {
    try {
      const experimentId = router.query.id as string // Assuming 'id' is the correct query parameter
      if (!experimentId) {
        showNotification('Experiment ID not found in the URL', 'error')
        return
      }

      window.ipc.send('generate-csv', { experimentId })
    } catch (error) {
      showNotification(`Error during CSV download: ${error.message}`, 'error')
    }
  }

  return (
    <Box sx={{ margin: 2, justifyContent: 'center', display: 'flex' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={downloadCSV}
        sx={{ marginRight: 2 }}
      >
        Download CSV
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ExportButton
