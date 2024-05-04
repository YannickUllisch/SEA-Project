import { Box, Typography } from '@mui/material'
import theme from '@renderer/src/lib/theme'
import { TriangleAlert } from 'lucide-react'
interface FormErrorProps {
  message?: string
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        borderRadius: 2,
        backgroundColor: '#fee2e2',
        padding: 1.5,
        marginBottom: 1,
      }}
    >
      <TriangleAlert color={theme.palette.error.main} />
      <Typography sx={{ color: theme.palette.error.main }}>
        {message}
      </Typography>
    </Box>
  )
}
