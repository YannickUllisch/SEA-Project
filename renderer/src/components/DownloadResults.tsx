import React from 'react'
import { Box, SpeedDial, SpeedDialAction } from '@mui/material'
import { FileDown, FileQuestion } from 'lucide-react'
import theme from '../lib/theme'

const DownloadResults = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        right: '40px',
        zIndex: 99,
        bottom: '40px',
      }}
    >
      <SpeedDial
        ariaLabel={'download'}
        FabProps={{
          //onClick: () => download(),
          variant: 'extended',
          sx: {
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.06)',
              transition: 'transform 0.3s ease',
              color: '#fff',
            },
          },
        }}
        icon={
          <>
            <FileDown /> {'export'}
          </>
        }
      >
        <SpeedDialAction
          key="export-and-bill"
          icon={<FileQuestion />}
          tooltipTitle={'Export Data for specific Questionnaire'}
          sx={{
            backgroundColor: theme.palette.primary.light,
          }}
        />
      </SpeedDial>
    </Box>
  )
}

export default DownloadResults
