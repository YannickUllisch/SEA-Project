import React, { useEffect } from 'react'
import { Button, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

const ExportButton = () => {
  const router = useRouter()

  useEffect(() => {
    const handleGeneratedCSV = (_event, filePath) => {
      toast.success(`CSV file created at: ${filePath}`)
    }

    const handleFailGenerateCSV = (_event, errorMessage) => {
      toast.error(`Failed to create CSV file: ${errorMessage}`)
    }

    window.ipc.on('generatedCSV', handleGeneratedCSV)
    window.ipc.on('failGenerateCSV', handleFailGenerateCSV)

    return () => {
      window.ipc.removeAllListeners('generatedCSV')
      window.ipc.removeAllListeners('failGenerateCSV')
    }
  }, [])

  const downloadCSV = async () => {
    try {
      const experimentId = router.query.id as string // Assuming 'id' is the correct query parameter
      if (!experimentId) {
        toast.error('Experiment ID not found in the URL')
        return
      }

      window.ipc.send('generate-csv', { experimentId })
    } catch (error) {
      toast.error(`Error during CSV download: ${error.message}`)
    }
  }

  return (
    <Box sx={{ margin: 2, justifyContent: 'center', display: 'flex' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={downloadCSV}
        sx={{ color: 'white' }}
      >
        Download CSV
      </Button>
    </Box>
  )
}

export default ExportButton
