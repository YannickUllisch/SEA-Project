import { Box, Button, Card, CardActions, CardContent } from '@mui/material'
import LoginForm from '@renderer/src/auth/LoginForm'

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        mt: 15,
      }}
    >
      <Box
        sx={{
          width: '50%',
          justifyContent: 'center',
          display: 'flex',
          alignContent: 'center',
        }}
      >
        <Card>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardActions>
            <Button size="small" href="/">
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  )
}

export default LoginPage
