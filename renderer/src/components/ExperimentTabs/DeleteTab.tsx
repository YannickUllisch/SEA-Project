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
  }, [router])

  return (
    <Box>
      <Button
        variant="outlined"
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
