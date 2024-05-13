import React, { useState } from 'react'
import { Button } from '@mui/material'
import DeleteExperimentModal from 'renderer/src/components/modals/deleteExperimentModal' // Adjust import path as necessary

const DeleteTab = ({ experimentId }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <div>
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
        experimentId={experimentId}
      />
    </div>
  )
}

export default DeleteTab
