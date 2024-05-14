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
        </Card>
      </Box>
    </Box>
  )
}

export default MainLoginPage
