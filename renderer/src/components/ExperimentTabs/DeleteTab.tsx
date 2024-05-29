import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import DeleteExperimentModal from 'renderer/src/components/modals/deleteExperimentModal'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

const DeleteTab = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    window.ipc.on('failDeleteExperiment', (message: string) => {
      toast.error(message)
    })

    window.ipc.on('deletedExperiment', (message: string) => {
      toast.success(message)
      router.push('/admin')
    })

    return () => {
      // Clean up event listeners to prevent multiple toasts
      window.ipc.removeAllListeners('deletedExperiment')
      window.ipc.removeAllListeners('failDeleteExperiment')
    }
  }, [router])

  return (
    <Box
      sx={{
        minWidth: '20%',
        m: 2,
        borderRadius: 2,
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        variant="contained"
        color="error"
        onClick={() => setModalOpen(true)}
      >
        Delete Experiment
      </Button>
      <DeleteExperimentModal
        open={isModalOpen}
        setOpen={setModalOpen}
        experimentId={router.query.id as string}
      />
    </Box>
  )
}

export default DeleteTab
