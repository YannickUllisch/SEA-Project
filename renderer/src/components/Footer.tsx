import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box
      sx={{
        height: '70px',
        justifyContent: 'center',
        alignItems: 'center',

        display: 'flex',
      }}
    >
      <Typography sx={{ ml: 2 }}>SEA © {new Date().getFullYear()}</Typography>
    </Box>
  )
}

export default Footer
