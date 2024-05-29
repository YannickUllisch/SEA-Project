import { useRouter } from 'next/router'
import type React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import ExportButton from '../ExportButton' // Adjust the import path
import type { ExperimentAnswers } from '@renderer/src/lib/types'
import { toast } from 'sonner'
import { BarChart } from '@mui/x-charts'
import 'survey-analytics/survey.analytics.min.css'
import { Model } from 'survey-core'
import { VisualizationPanel } from 'survey-analytics'
import { Box, Divider, MenuItem, TextField, Typography } from '@mui/material'
import GeneralAnalytics from '../GeneralAnalytics'

const vizPanelOptions = {
  allowHideQuestions: false,
  visualizerTypes: {
    text: ['bar', 'pie', 'line'],
  },
}

const AnalyticsTab = () => {
  const router = useRouter()
  const [experimentAnswers, setExperimentAnswers] = useState<
    ExperimentAnswers[] | undefined
  >(undefined)

  const [selectedVersion, setSelectedVersion] = useState<string>(null)
  const [survey, setSurvey] = useState<Model>(null)
  const [vizPanel, setVizPanel] = useState(null)
  const vizPanelRef = useRef(null)

  useEffect(() => {
    const fetchAnswers = () => {
      window.ipc.send('getExperimentAnswers', {
        experimentID: router.query.id,
      })
    }

    window.ipc.on('getExperimentAnswers', (answers: ExperimentAnswers[]) => {
      setExperimentAnswers(answers)
      if (answers.length > 0) {
        setSurvey(new Model(answers[0].form))
      }
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

  useEffect(() => {
    if (experimentAnswers) {
      if (!vizPanel && !!survey) {
        const vizPanel = new VisualizationPanel(
          survey.getAllQuestions(),
          experimentAnswers[0].answers.map((answer) => answer.answerJSON),
          vizPanelOptions,
        )

        setVizPanel(vizPanel)
        setSelectedVersion(experimentAnswers[0].version)
      }
    }
  }, [experimentAnswers, survey, vizPanel])

  useEffect(() => {
    if (vizPanel && vizPanelRef.current) {
      vizPanel.render(vizPanelRef.current) // Render the vizPanel in the container
    }
  }, [vizPanel])

  const handleVersionChange = (newVal: string) => {
    setSelectedVersion(newVal)
    const selectedAnswer = experimentAnswers.find(
      (answer) => answer.version === newVal,
    )
    if (selectedAnswer) {
      vizPanelRef.current = null
      const surveyModel = new Model(selectedAnswer.form)
      setSurvey(surveyModel)
      const newVizPanel = new VisualizationPanel(
        surveyModel.getAllQuestions(),
        selectedAnswer.answers.map((answer) => answer.answerJSON),
        vizPanelOptions,
      )
      newVizPanel.showToolbar = false
      setVizPanel(newVizPanel)
    }
  }

  const versionOptions = useMemo(() => {
    if (experimentAnswers) {
      return experimentAnswers.map((answer) => (
        <MenuItem key={answer.version} value={answer.version}>
          {answer.version}
        </MenuItem>
      ))
    }
  }, [experimentAnswers])

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
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: 'bold', mb: 2 }} variant="h5">
          Questionnaire Version Analytics
        </Typography>
        {selectedVersion && (
          <TextField
            select
            fullWidth
            label="Version"
            value={selectedVersion}
            onChange={(e) => handleVersionChange(e.target.value)}
          >
            {versionOptions}
          </TextField>
        )}
      </Box>
      <Box ref={vizPanelRef} />
    </Box>
  )
}

export default AnalyticsTab
