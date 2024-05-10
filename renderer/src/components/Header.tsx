import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import theme from '../lib/theme'
import { useRouter } from 'next/router'
import { useSession } from './SessionProvider'
import { logout } from '@renderer/src/lib/logout'

const Header = () => {
  const router = useRouter()
  const session = useSession()

  return (
    <>
      {router.pathname !== '/' && (
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
                onClick={() => router.push('/')}
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
                onClick={logout}
              >
                Logout
              </Button>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

export default Header
