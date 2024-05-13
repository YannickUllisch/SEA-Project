import { Box } from '@mui/material'
import React from 'react'
import 'survey-core/defaultV2.min.css'
import 'survey-creator-core/survey-creator-core.min.css'
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react'

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
}

const SurveyCreationPage = () => {
  const creator = new SurveyCreator(creatorOptions)
  return (
    <Box sx={{ height: 1000 }}>
      {' '}
      <SurveyCreatorComponent creator={creator} />{' '}
    </Box>
  )
}

export default SurveyCreationPage
