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
import type { FrontendQuestionnaire } from '@renderer/src/lib/types'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import theme from '@renderer/src/lib/theme'
import { Role } from '@renderer/src/lib/role'
import { useSession } from '../SessionProvider'
import PreviewQuestionnaireDialog from '../modals/previewQuestionnaireDialog'
import { Eye } from 'lucide-react'

const GeneralTab = () => {
  const router = useRouter()
  const session = useSession()
  const [selectedQuestionnaireForm, setSelectedQuestionnaireForm] =
    useState<string>('')
  const [isPreviewOpen, setPreviewOpen] = useState(false)
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
    window.ipc.send('deleteQuestionnaire', {
      questionnaireID,
      experimentID: router.query.id,
    })

    window.ipc.on('deletedQuestionnaire', (message: string) => {
      toast.success(message)
      setQuestionnaires(questionnaires?.filter((q) => q.id !== questionnaireID))
    })

    window.ipc.on('failDeleteQuestionnaire', (message: string) => {
      toast.error(message)
    })
  }

  const onCopyQuestionnaire = (questionnaireID: string) => {
    window.ipc.send('copyQuestionnaire', {
      questionnaireID,
      experimentID: router.query.id,
    })

    window.ipc.on('copyQuestionnaire', (message: string) => {
      toast.success(message)
      setQuestionnaires(undefined)
    })

    window.ipc.on('failedCopy', (message: string) => {
      toast.error(message)
    })
  }

  const handlePreview = (stringifiedJSON: string) => {
    setSelectedQuestionnaireForm(stringifiedJSON)
    setPreviewOpen(true)
  }

  return (
    <>
      <PreviewQuestionnaireDialog
        open={isPreviewOpen}
        setOpen={setPreviewOpen}
        stringifiedJSON={selectedQuestionnaireForm}
      />
      <Box
        sx={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {questionnaires
          ? questionnaires.map((questionnaire) => (
              <Card key={questionnaire.id} sx={{ margin: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography sx={{ mb: 1 }} variant="h5">
                    Questionnaire Version: {questionnaire.version}
                  </Typography>
                </CardContent>
                {session
                  ? session.user.role <= Role.ADMIN && (
                      <CardActions
                        disableSpacing
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box>
                          <Button
                            size="small"
                            onClick={() =>
                              onCopyQuestionnaire(questionnaire.id)
                            }
                          >
                            Create Copy
                          </Button>
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
                    )
                  : null}
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
    </>
  )
}

export default GeneralTab
