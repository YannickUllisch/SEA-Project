import { useRouter } from 'next/router'
import type React from 'react'
import { useEffect, useState } from 'react'
import ExportButton from '../ExportButton' // Adjust the import path
import type { ExperimentAnswers } from '@renderer/src/lib/types'
import { toast } from 'sonner'
import 'survey-analytics/survey.analytics.min.css'
import { Box, Divider, Typography } from '@mui/material'
import GeneralAnalytics from '../GeneralAnalytics'
import dynamic from 'next/dynamic'

// Dynamically import the wrapper component
const SurveyDashboard = dynamic(
  () => import('@renderer/src/components/survey/SurveyDashboard'),
  { ssr: false },
)

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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ marginTop: 1, marginBottom: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}
        >
          Export Data
        </Typography>
        <ExportButton />
      </Box>
      <Divider />
      {experimentAnswers && <GeneralAnalytics answers={experimentAnswers} />}

      <Divider />

      {experimentAnswers && <SurveyDashboard answers={experimentAnswers} />}
    </Box>
  )
}

export default AnalyticsTab
