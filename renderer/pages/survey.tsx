import React from 'react'
import Head from 'next/head'
import { Box, Button } from '@mui/material'
import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'

const NextPage = () => {
  const surveyJson = {
    elements: [
      {
        name: 'FirstName',
        title: 'Enter your first name:',
        type: 'text',
      },
      {
        name: 'LastName',
        title: 'Enter your last name:',
        type: 'text',
      },
    ],
  }

  const survey = new Model(surveyJson)
  survey.addNavigationItem({
    title: 'Exit',
  })

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
    >
      <Survey model={survey} />
    </Box>
  )
}

export default NextPage
