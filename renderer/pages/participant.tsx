import React, { useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import theme from '@renderer/src/lib/theme'
import { useSession } from '@renderer/src/components/SessionProvider'
import { logout } from '@renderer/src/lib/logout'

const ParticipantHomePage = () => {
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    if (session) {
      logout()
    }
  }, [session])

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
          padding: 5,
          marginTop: 25,
          minWidth: '500px',
          textAlign: 'center',
          borderRadius: 4,
        }}
      >
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h4" fontWeight={'bold'}>
            Questionnaire
          </Typography>
          <Typography color={theme.palette.text.secondary} variant="body2">
            Start your questionnaire below!
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ color: 'white' }}
          onClick={() =>
            router.push({
              pathname: '/survey',
              query: {
                executedExperiment: router.query.executedExperiment as string,
              },
            })
          }
        >
          Start Questionnaire
        </Button>
      </Box>
    </Box>
  )
}

export default ParticipantHomePage
