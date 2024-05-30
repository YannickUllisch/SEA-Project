import { Box, Card, CardContent } from '@mui/material'
import LoginForm from '@renderer/src/components/auth/LoginForm'
import theme from '@renderer/src/lib/theme'

const MainLoginPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        mt: 30,
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
          }}
          style={{ boxShadow: '0px 0px 5px rgba(0,0,0,0.05)' }}
        >
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default MainLoginPage
