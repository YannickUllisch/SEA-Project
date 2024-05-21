import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material'
import type { FrontendQuestionnaire } from '@renderer/src/lib/types'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const GeneralTab = () => {
  const router = useRouter()
  const [questionnaires, setQuestionnaires] = useState<
    FrontendQuestionnaire[] | undefined
  >(undefined)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <Needed to fetch from backend>
  useEffect(() => {
    window.ipc.send('getQuestionnaires', {
      experimentID: router.query.id as string,
    })

    window.ipc.on(
      'getQuestionnaires',
      (experimentQuestionnaires: FrontendQuestionnaire[]) => {
        setQuestionnaires(experimentQuestionnaires)
      },
    )
  }, [questionnaires === undefined])

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
            <Card sx={{ margin: 2 }}>
              <CardContent>
                <Typography>
                  Questionnaire Version: {questionnaire.version}
                </Typography>
                <Typography>
                  Questionnaire Form: {questionnaire.form}
                </Typography>
              </CardContent>
            </Card>
          ))
        : null}

      <Button
        variant="contained"
        sx={{ width: 'full' }}
        disabled={questionnaires && questionnaires.length < 1}
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
