import { Box, Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const ExperimentPage = () => {
  const router = useRouter()
  const _currentExperimentId = router.query.id

  return (
    <Box>
      <Button onClick={() => router.push('/admin')}>Back</Button>{' '}
    </Box>
  )
}

export default ExperimentPage
