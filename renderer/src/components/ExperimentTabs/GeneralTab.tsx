import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import type { FrontendQuestionnaire } from '@renderer/src/lib/types'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const GeneralTab = () => {
  const router = useRouter()
  const [questionnaires, setQuestionnaires] = useState<
    FrontendQuestionnaire[] | undefined
  >(undefined)

  useEffect(() => {
    const fetchQuestionnaires = () => {
      window.ipc.send('getQuestionnaires', {
        experimentID: router.query.id as string,
      })

      const handleGetQuestionnaires = (
        experimentQuestionnaires: FrontendQuestionnaire[],
      ) => {
        setQuestionnaires(experimentQuestionnaires)
      }

      const handleFailGetQuestionnaires = (message: string) => {
        console.error('Failed to get questionnaires:', message)
      }

      window.ipc.on('getQuestionnaires', handleGetQuestionnaires)
      window.ipc.on('failGetQuestionnaires', handleFailGetQuestionnaires)

      return () => {
        window.ipc.removeAllListeners('getQuestionnaires')
        window.ipc.removeAllListeners('failGetQuestionnaires')
      }
    }

    if (questionnaires === undefined) {
      fetchQuestionnaires()
    }
  }, [questionnaires, router.query.id])

  const handleDeleteQuestionnaire = (questionnaireID: string) => {
    window.ipc.send('deleteQuestionnaire', { questionnaireID })

    window.ipc.on('deletedQuestionnaire', (message: string) => {
      toast.success(message)
      setQuestionnaires(questionnaires?.filter((q) => q.id !== questionnaireID))
    })

    window.ipc.on('failDeleteQuestionnaire', (message: string) => {
      toast.error(message)
    })
  }

  return (
    <Box
      sx={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {questionnaires
        ? questionnaires.map((questionnaire) => (
            <Card key={questionnaire.id} sx={{ margin: 2 }}>
              <CardContent>
                <Typography>
                  Questionnaire Version: {questionnaire.version}
                </Typography>
                <Typography>
                  Questionnaire Form: {questionnaire.form}
                </Typography>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteQuestionnaire(questionnaire.id)}
                >
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          ))
        : null}

      <Button
        variant="contained"
        sx={{ width: 'full' }}
        disabled={!questionnaires || questionnaires.length < 1}
        onClick={() =>
          router.push({
            pathname: '/participant',
            query: { executedExperiment: router.query.id as string },
          })
        }
      >
        Execute Random Questionnaire
      </Button>
    </Box>
  )
}

export default GeneralTab
