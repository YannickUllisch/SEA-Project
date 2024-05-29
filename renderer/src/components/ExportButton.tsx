import React, { useState, useEffect } from 'react'
import { Button, Snackbar, Alert, type AlertColor, Box } from '@mui/material'

const isElectron =
  typeof window !== 'undefined' &&
  typeof window.process !== 'undefined' &&
  window.process.type === 'renderer'

const ExportButton = () => {
  const [ipcRenderer, setIpcRenderer] = useState<any>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>('success')

  useEffect(() => {
    if (isElectron) {
      const { ipcRenderer } = window.require('electron')
      setIpcRenderer(ipcRenderer)
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
      if (ipcRenderer) {
        const filePath = await ipcRenderer.invoke('generate-csv')
        showNotification(`CSV file created at: ${filePath}`)
      } else {
        showNotification('Not running in Electron environment', 'error')
      }
    } catch (error) {
      showNotification('Failed to create CSV file', 'error')
    }
  }

  const downloadXLSX = async () => {
    try {
      if (ipcRenderer) {
        const filePath = await ipcRenderer.invoke('generate-xlsx')
        showNotification(`XLSX file created at: ${filePath}`)
      } else {
        showNotification('Not running in Electron environment', 'error')
      }
    } catch (error) {
      showNotification('Failed to create XLSX file', 'error')
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
      <Button variant="contained" color="primary" onClick={downloadXLSX}>
        Download XLSX
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
