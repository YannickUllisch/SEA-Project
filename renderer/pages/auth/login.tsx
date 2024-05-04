import { Box, Button, Card, CardActions, CardContent } from '@mui/material'
import LoginForm from '@renderer/src/components/auth/LoginForm'
import theme from '@renderer/src/lib/theme'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LoginPage = () => {
  const router = useRouter()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        mt: 20,
      }}
    >
      <Box
        sx={{
          width: '18%',
          minWidth: '300px',
          justifyContent: 'center',
          display: 'flex',
          alignContent: 'center',
        }}
      >
        <Card
          sx={{
            borderRadius: 5,
            padding: 1,
            border: 1,
            borderColor: theme.palette.grey[200],
            boxShadow: 1,
          }}
        >
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardActions>
            <Button
              size="small"
              sx={{
                color: theme.palette.text.secondary,
                '&:hover': {
                  backgroundColor: 'inherit',
                  textDecoration: 'underline',
                },
              }}
              onClick={() => router.push('/')}
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  )
}

export default LoginPage
