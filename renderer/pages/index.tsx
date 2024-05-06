import React, { useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import theme from '@renderer/src/lib/theme'
import { useSession } from '@renderer/src/components/SessionProvider'

const HomePage = () => {
  const [message, setMessage] = React.useState('No message found')
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    window.ipc.on('message', (message: string) => {
      setMessage(message)
    })
  }, [])

  return (
    <>
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
            marginTop: 10,
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
            sx={{
              backgroundImage: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.light})`,
              color: 'white', // Text color
              '&:hover': {
                backgroundImage: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
              },
            }}
            onClick={() => router.push('/survey')}
          >
            Start Questionnaire
          </Button>
          <Box sx={{ mt: 5 }}>
            <Button
              type="submit"
              sx={{ color: 'black' }}
              onClick={() => {
                window.ipc.send('message', 'Hello')
              }}
            >
              Test IPC
            </Button>
            <p>{message}</p>
            <Button onClick={() => console.log(session)}>Test Session </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default HomePage
