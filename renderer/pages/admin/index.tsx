import { Box, Button, Typography } from '@mui/material'
import { logout } from '@renderer/src/lib/logout'
import { useRouter } from 'next/router'
import React from 'react'

const AdminPage = () => {
  const router = useRouter()

  const onQuestionnaireStart = () => {
    router.push('/participant')
    logout()
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography>
        Admin Dashboard Showing Experiments Linked to user
      </Typography>
      <Button onClick={onQuestionnaireStart} variant="contained">
        Execute Questionnaire Test
      </Button>
    </Box>
  )
}

export default AdminPage
