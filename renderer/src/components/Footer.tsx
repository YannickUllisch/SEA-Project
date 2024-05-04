import { Box, Typography } from '@mui/material'
import React from 'react'
import theme from '../lib/theme'

const Footer = () => {
  return (
    <Box
      sx={{
        height: '70px',
        justifyContent: 'space-between',
        borderTop: 1,
        borderTopColor: theme.palette.grey[300],
        alignItems: 'center',

        display: 'flex',
      }}
    >
      <Typography sx={{ ml: 2 }}>SEA © {new Date().getFullYear()}</Typography>
      <Typography sx={{ mr: 2 }}>Group 1</Typography>
    </Box>
  )
}

export default Footer
