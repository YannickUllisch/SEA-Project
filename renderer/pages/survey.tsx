import React from 'react'
import Head from 'next/head'
import { Box, Button } from '@mui/material'
import 'survey-core/defaultV2.min.css'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'

const NextPage = () => {
  const surveyJson = {
    title: 'Yehaw Trest',
    description: 'Yehaw telelelele',
    logoPosition: 'right',
    pages: [
      {
        name: 'page1',
        elements: [
          {
            type: 'rating',
            name: 'question1',
            title: 'How cool is my mus',
          },
          {
            type: 'text',
            name: 'question2',
            title: 'Er hun den bedste',
          },
        ],
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
