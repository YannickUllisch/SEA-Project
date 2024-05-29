import React, { useEffect, useMemo, useRef, useState, type FC } from 'react'
import type { ExperimentAnswers } from '@renderer/src/lib/types'
import { Box, MenuItem, TextField, Typography } from '@mui/material'
import { Model } from 'survey-core'
import { VisualizationPanel } from 'survey-analytics'

interface DashboardProps {
  answers: ExperimentAnswers[]
}

const vizPanelOptions = {
  showClearButton: false,
  allowHideQuestions: true,
  visualizerTypes: {
    text: ['bar', 'pie', 'line'],
  },
}

const SurveyDashboard: FC<DashboardProps> = ({ answers }) => {
  const [selectedVersion, setSelectedVersion] = useState<string>(null)
  const [survey, setSurvey] = useState<Model>(
    answers.length > 0 ? new Model(JSON.parse(answers[0].form)) : null,
  )
  const [vizPanel, setVizPanel] = useState(null)
  const vizPanelRef = useRef(null)

  useEffect(() => {
    if (answers) {
      if (!vizPanel && !!survey) {
        const vizPanel = new VisualizationPanel(
          survey.getAllQuestions(),
          answers[0].answers.map((answer) => answer.answerJSON),
          vizPanelOptions,
        )

        setVizPanel(vizPanel)
        setSelectedVersion(answers[0].version)
      }
    }
  }, [answers, survey, vizPanel])

  useEffect(() => {
    if (vizPanel && vizPanelRef.current) {
      vizPanel.render(vizPanelRef.current) // Render the vizPanel in the container
    }
  }, [vizPanel])

  const handleVersionChange = (newVal: string) => {
    setSelectedVersion(newVal)
    const selectedAnswer = answers.find((answer) => answer.version === newVal)
    if (selectedAnswer) {
      // Reset existing visualization panel
      if (vizPanel) {
        if (vizPanelRef.current) {
          while (vizPanelRef.current.firstChild) {
            vizPanelRef.current.removeChild(vizPanelRef.current.firstChild)
          }
        }

        setVizPanel(null)
      }
      if (vizPanelRef.current) {
        vizPanelRef.current.innerHTML = '' // Clear the container
      }

      // Create and set new visualization panel
      const surveyModel = new Model(selectedAnswer.form)
      const newVizPanel = new VisualizationPanel(
        surveyModel.getAllQuestions(),
        selectedAnswer.answers.map((answer) => answer.answerJSON),
        vizPanelOptions,
      )
      //newVizPanel.showToolbar = false
      setSurvey(surveyModel)
      setVizPanel(newVizPanel)
    }
  }

  const versionOptions = useMemo(() => {
    if (answers) {
      return answers.map((answer) => (
        <MenuItem key={answer.version} value={answer.version}>
          {answer.version}
        </MenuItem>
      ))
    }
  }, [answers])

  return (
    <>
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
      <Box ref={vizPanelRef} />{' '}
    </>
  )
}

export default SurveyDashboard
