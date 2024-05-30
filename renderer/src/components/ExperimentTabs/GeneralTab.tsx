import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  CardActions,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import type {
  FrontendExperiment,
  FrontendQuestionnaire,
} from '@renderer/src/lib/types'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Role } from '@renderer/src/lib/role'
import { useSession } from '../SessionProvider'
import PreviewQuestionnaireDialog from '../modals/previewQuestionnaireDialog'
import { CopyPlus, Edit, Eye, Pencil } from 'lucide-react'
import QuestionnaireTitleDialog from '../modals/questionnaireTitleDialog'
import theme from '@renderer/src/lib/theme'

const GeneralTab = ({ onEditQuestionnaire }) => {
  const router = useRouter()
  const session = useSession()
  const [selectedQuestionnaireForm, setSelectedQuestionnaireForm] =
    useState<string>('')
  const [isPreviewOpen, setPreviewOpen] = useState(false)
  const [questionnaires, setQuestionnaires] = useState<
    FrontendQuestionnaire[] | undefined
  >(undefined)
  const [isEditDialogOpen, setEditDialogOpen] = useState(false)
  const [editQuestionnaire, setEditQuestionnaire] =
    useState<FrontendQuestionnaire | null>(null)
  const [experiment, setExperiment] = useState(null)

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

    const fetchExperiment = () => {
      window.ipc.send('getExperiments', {})

      const handleGetExperiments = (experiments: FrontendExperiment[]) => {
        const experiment = experiments.find((exp) => exp.id === router.query.id)
        setExperiment(experiment)
      }

      const handleFailGetExperiments = (message: string) => {
        console.error('Failed to get experiments:', message)
      }

      window.ipc.on('getExperiments', handleGetExperiments)
      window.ipc.on('failGetExperiments', handleFailGetExperiments)

      return () => {
        window.ipc.removeAllListeners('getExperiments')
        window.ipc.removeAllListeners('failGetExperiments')
      }
    }

    if (questionnaires === undefined) {
      fetchQuestionnaires()
    }

    if (!experiment) {
      fetchExperiment()
    }
  }, [questionnaires, experiment, router.query.id])

  const handleDeleteQuestionnaire = (questionnaireID: string) => {
    window.ipc.send('deleteQuestionnaire', {
      questionnaireID,
      experimentID: router.query.id,
    })
  }

  const onCopyQuestionnaire = (questionnaireID: string) => {
    window.ipc.send('copyQuestionnaire', {
      questionnaireID,
      experimentID: router.query.id,
    })
  }

  const handlePreview = (stringifiedJSON: string) => {
    setSelectedQuestionnaireForm(stringifiedJSON)
    setPreviewOpen(true)
  }

  const handleEditTitle = (questionnaire: FrontendQuestionnaire) => {
    setEditQuestionnaire(questionnaire)
    setEditDialogOpen(true)
  }

  const handleSaveTitle = (title: string) => {
    if (editQuestionnaire) {
      window.ipc.send('updateQuestionnaireTitle', {
        questionnaireID: editQuestionnaire.id,
        version: title,
        experimentID: router.query.id,
      })
    }
  }

  // UseEffect catching all answers from backend
  useEffect(() => {
    // Add event listeners of Title Updates
    window.ipc.on('updatedQuestionnaireTitle', (message: string) => {
      toast.success(message)
      setQuestionnaires(undefined)
      setEditQuestionnaire(null)
    })

    window.ipc.on('failUpdateQuestionnaireTitle', (message: string) => {
      toast.error(message)
    })

    // Event listeners for copy updates
    window.ipc.on('copyQuestionnaire', (message: string) => {
      toast.success(message)
      setQuestionnaires(undefined)
    })

    window.ipc.on('failedCopy', (message: string) => {
      toast.error(message)
    })

    // Handling questionnaire deletion updates
    window.ipc.on('deletedQuestionnaire', (message: string) => {
      toast.success(message)
      setQuestionnaires(undefined)
    })

    window.ipc.on('failDeleteQuestionnaire', (message: string) => {
      toast.error(message)
    })
    return () => {
      // Clean up event listeners to prevent multiple toasts
      window.ipc.removeAllListeners('updatedQuestionnaireTitle')
      window.ipc.removeAllListeners('failUpdateQuestionnaireTitle')
      window.ipc.removeAllListeners('copyQuestionnaire')
      window.ipc.removeAllListeners('failedCopy')
      window.ipc.removeAllListeners('deletedQuestionnaire')
      window.ipc.removeAllListeners('failDeleteQuestionnaire')
    }
  }, [])

  return (
    <>
      <PreviewQuestionnaireDialog
        open={isPreviewOpen}
        setOpen={setPreviewOpen}
        stringifiedJSON={selectedQuestionnaireForm}
      />
      <QuestionnaireTitleDialog
        open={isEditDialogOpen}
        setOpen={setEditDialogOpen}
        onSave={handleSaveTitle}
        initialTitle={editQuestionnaire?.version || ''}
      />
      <Box
        sx={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {experiment && (
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="h6">Experiment Restart Code:</Typography>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 'bold',
                color: theme.palette.primary.main,
              }}
            >
              {experiment.restartCode}
            </Typography>
          </Box>
        )}
        {questionnaires
          ? questionnaires.map((questionnaire) => (
              <Card
                key={questionnaire.id}
                sx={{
                  margin: 2,
                  border: 1,
                  borderColor: theme.palette.grey[300],
                }}
                style={{ boxShadow: '0px 0px 5px rgba(0,0,0,0.1)' }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Typography sx={{ mb: 1 }} variant="h5">
                      Questionnaire Version: {questionnaire.version}
                    </Typography>
                    {session
                      ? session.user.role <= Role.ADMIN && (
                          <Tooltip title="Edit title ">
                            <IconButton
                              aria-label="edit"
                              sx={{ width: 35 }}
                              onClick={() => handleEditTitle(questionnaire)}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                        )
                      : null}
                  </Box>
                </CardContent>
                {session ? (
                  session.user.role <= Role.ADMIN ? (
                    <CardActions
                      disableSpacing
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box>
                        <Tooltip title="Edit Questionnaire">
                          <IconButton
                            onClick={() =>
                              onEditQuestionnaire(questionnaire.id)
                            }
                          >
                            <Pencil />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Copy Questionnaire">
                          <IconButton
                            onClick={() =>
                              onCopyQuestionnaire(questionnaire.id)
                            }
                          >
                            <CopyPlus />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Preview">
                          <IconButton
                            onClick={() => handlePreview(questionnaire.form)}
                          >
                            <Eye />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          onClick={() =>
                            handleDeleteQuestionnaire(questionnaire.id)
                          }
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  ) : (
                    <CardActions
                      disableSpacing
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Tooltip title="Preview">
                        <IconButton
                          onClick={() => handlePreview(questionnaire.form)}
                        >
                          <Eye />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  )
                ) : null}
              </Card>
            ))
          : null}
        <Button
          variant="contained"
          sx={{ width: 'full', mt: 2, color: 'white' }}
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
    </>
  )
}

export default GeneralTab
