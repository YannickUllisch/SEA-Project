import { Box } from '@mui/material'
import type { FC } from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: string
  value: string
}

export const CustomTabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: { xs: 0, sm: 1, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  )
}

export default CustomTabPanel
