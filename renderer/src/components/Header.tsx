import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import theme from '../lib/theme'
import { useRouter } from 'next/router'
import { useSession } from './SessionProvider'

interface Page {
  name: string
  path: string
}

const Header = () => {
  const router = useRouter()
  const session = useSession()

  const adminPages: Page[] = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Admin',
      path: '/admin',
    },
  ]
  return (
    <Box
      sx={{
        height: '70px',
        width: '98%',
        ml: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" fontWeight={'bolder'}>
        A/B Testing
      </Typography>
      <Box>
        {session
          ? adminPages.map((page) => (
              <Button
                key={page.name}
                sx={{
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    backgroundColor: 'inherit',
                    textDecoration: 'underline',
                  },
                  mr: 1,
                }}
                onClick={() => router.push(page.path)}
                variant="text"
              >
                {page.name}
              </Button>
            ))
          : null}
      </Box>
      <Box>
        {!session ? (
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
        ) : (
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
          >
            Logout
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Header
