import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import type { dbQuestionnaire } from '@prisma/client'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const GeneralTab = () => {
  const router = useRouter()
  const [questionnaires, setQuestionnaires] = useState<
    dbQuestionnaire[] | undefined
  >(undefined)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <Needed to fetch from backend>
  useEffect(() => {
    window.ipc.send('getQuestionnaire', {
      experimentId: router.query.id as string,
    })

    window.ipc.on(
      'getQuestionnaire',
      (experimentQuestionnaires: dbQuestionnaire[]) => {
        setQuestionnaires(experimentQuestionnaires)
      },
    )
  }, [questionnaires === undefined])

  return (
    <Box>
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
    </Box>
  )
}

export default GeneralTab
