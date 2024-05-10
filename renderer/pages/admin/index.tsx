import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import type { Experiment } from '@prisma/client'
import { useSession } from '@renderer/src/components/SessionProvider'
import { logout } from '@renderer/src/lib/logout'
import theme from '@renderer/src/lib/theme'
import { Play, Settings } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const AdminPage = () => {
  const router = useRouter()
  const [experiments, setExperiments] = useState<Experiment[] | undefined>(
    undefined,
  )

  // Fetching experiments from backend
  window.ipc.send('getExperiments', '')

  // Waiting for backend response
  useEffect(() => {
    window.ipc.on('getExperiments', (experiments: Experiment[]) => {
      setExperiments(experiments)
    })
  }, [])

  const onQuestionnaireStart = () => {
    router.push('/participant')
    logout()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 5,
          minWidth: '90%',
          minHeight: '500px',
          borderRadius: 4,
        }}
      >
        <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>
          Experiments
        </Typography>

        <Box
          sx={{
            justifyContent: 'center',
            alignItems: ' center',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {experiments
            ? experiments.map((experiment) => (
                <Card
                  key={experiment.title}
                  sx={{
                    boxShadow: 3,
                    width: '20%',
                    m: 2,
                    borderRadius: 2,
                  }}
                >
                  <CardHeader
                    title={experiment.title}
                    subheader={experiment.description}
                  />
                  <CardContent>
                    <Divider />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 1,
                      }}
                    >
                      <Tooltip title={'Edit'}>
                        <Settings
                          style={{ color: theme.palette.text.secondary }}
                        />
                      </Tooltip>
                      <Tooltip title={'Start Experiment'}>
                        <Play style={{ color: 'green' }} />
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              ))
            : undefined}
        </Box>
        <Button onClick={onQuestionnaireStart} variant="contained">
          Execute Questionnaire Test
        </Button>
      </Box>
    </Box>
  )
}

export default AdminPage
