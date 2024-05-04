import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import theme from '@renderer/src/lib/theme'
import { LogIn } from 'lucide-react'

const HomePage = () => {
  const [message, setMessage] = React.useState('No message found')
  const router = useRouter()
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
            height: '70px',
            width: '98%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" fontWeight={'bolder'}>
            A/B Testing
          </Typography>
          <Button
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: 'inherit',
                textDecoration: 'underline',
              },
              gap: 0.5,
            }}
            variant="text"
            onClick={() => router.push('/auth/login')}
          >
            Login
          </Button>
        </Box>
        <Box
          sx={{
            backgroundColor: 'white',
            padding: 5,
            marginTop: 10,
            textAlign: 'center',
            borderRadius: 4,
          }}
        >
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h4" fontWeight={'bold'}>
              Survey System
            </Typography>
            <Typography color={theme.palette.text.secondary} variant="body2">
              Start your survey below!
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
            Start Survey
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
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default HomePage
