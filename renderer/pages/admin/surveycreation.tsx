import { Box } from '@mui/material'
import React from 'react'
import SurveyCreatorComponent from '@renderer/src/components/SurveyCreator'

import dynamic from 'next/dynamic'

const SurveyComponent = dynamic(
  () => import('@renderer/src/components/SurveyCreator'),
  {
    ssr: false,
  },
)

const SurveyCreationPage = () => {
  return (
    <Box sx={{ height: 1000 }}>
      <SurveyComponent />
    </Box>
  )
}

export default SurveyCreationPage
