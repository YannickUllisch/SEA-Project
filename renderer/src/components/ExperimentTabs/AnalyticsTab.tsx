import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ExportButton from '../ExportButton' // Adjust the import path
import type { ExperimentAnswers } from '@renderer/src/lib/types'
import { toast } from 'sonner'
import { Box, Typography } from '@mui/material'

const AnalyticsTab = () => {
  const router = useRouter()
  const [experimentAnswers, setExperimentAnswers] = useState<
    ExperimentAnswers[] | undefined
  >(undefined)

  useEffect(() => {
    const fetchAnswers = () => {
      window.ipc.send('getExperimentAnswers', {
        experimentID: router.query.id,
      })
    }

    window.ipc.on('getExperimentAnswers', (answers: ExperimentAnswers[]) => {
      setExperimentAnswers(answers)
    })

    window.ipc.on('failGetExperimentAnswers', (message: string) => {
      toast.error(message)
    })

    if (experimentAnswers === undefined) {
      fetchAnswers()
    }

    return () => {
      window.ipc.removeAllListeners('getExperimentAnswers')
      window.ipc.removeAllListeners('failGetExperimentAnswers')
    }
  }, [experimentAnswers, router.query.id])

  return (
    <div>
      <h2>Analytics</h2>
      {experimentAnswers
        ? experimentAnswers.map((answer) => (
            <Box
              sx={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography>Questionnaire Version: {answer.version}</Typography>{' '}
              <Typography>
                Version Answer Amount: {answer.answers.length}
              </Typography>
            </Box>
          ))
        : null}
      <h3>Download questionnaire answer data below</h3>
      <ExportButton />
    </div>
  )
}

export default AnalyticsTab
