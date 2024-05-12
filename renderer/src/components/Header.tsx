import { Box, Button, Tooltip, Typography } from '@mui/material'
import React from 'react'
import theme from '../lib/theme'
import { useRouter } from 'next/router'
import { useSession } from './SessionProvider'
import { logout } from '@renderer/src/lib/logout'
import { HomeIcon } from 'lucide-react'

const Header = () => {
  const router = useRouter()
  const session = useSession()

  return (
    <>
      {router.pathname !== '/' && (
        <Box
          sx={{
            height: '70px',
            width: '100%',
            display: 'flex',
            backgroundColor: 'white',
            margin: '0 auto',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" fontWeight={'bolder'} sx={{ ml: 2 }}>
            A/B Testing
          </Typography>

          {session && (
            <Button
              onClick={() => router.push('/admin')}
              sx={{ color: theme.palette.text.secondary }}
            >
              Home
            </Button>
          )}

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
                  mr: 2,
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
