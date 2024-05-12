import { Box, Button, Divider, Tab, Tabs, Typography } from '@mui/material'
import AnalyticsTab from '@renderer/src/components/ExperimentTabs/AnalyticsTab'
import AssistantsTab from '@renderer/src/components/ExperimentTabs/AssistantsTab'
import CustomTabPanel from '@renderer/src/components/ExperimentTabs/CustomTabPanel'
import DeleteTab from '@renderer/src/components/ExperimentTabs/DeleteTab'
import GeneralTab from '@renderer/src/components/ExperimentTabs/GeneralTab'
import { useSession } from '@renderer/src/components/SessionProvider'
import { Role } from '@renderer/src/lib/role'
import type React from 'react'
import { useState } from 'react'

const experimentTabs: {
  roles: Role[]
  id: string
  component: JSX.Element
}[] = [
  {
    roles: [Role.ADMIN, Role.ASSISTANT],
    id: 'general',
    component: <GeneralTab />,
  },
  {
    roles: [Role.ADMIN, Role.ASSISTANT],
    id: 'analytics',
    component: <AnalyticsTab />,
  },
  {
    roles: [Role.ADMIN],
    id: 'assistants',
    component: <AssistantsTab />,
  },
  {
    roles: [Role.ADMIN],
    id: 'delete',
    component: <DeleteTab />,
  },
]

const ExperimentPage = () => {
  const session = useSession()

  const [tab, setTab] = useState<string>('general')

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 5,
          minWidth: '95%',
          minHeight: '500px',
          borderRadius: 4,
        }}
      >
        <Typography sx={{ fontSize: 30, fontWeight: 'bold' }}>
          Edit Experiment
        </Typography>
        <Divider />
        <Box sx={{ mt: 1 }}>
          <Tabs centered value={tab} onChange={handleTabChange}>
            {experimentTabs.map(
              (tabConfig) =>
                tabConfig.roles.includes(session.user.role) && (
                  <Tab
                    key={`${tabConfig.id}-tab`}
                    label={tabConfig.id}
                    value={tabConfig.id}
                  />
                ),
            )}
          </Tabs>
        </Box>
        {experimentTabs.map(
          (tabConfig) =>
            tabConfig.roles.includes(session.user.role) && (
              <CustomTabPanel
                key={`${tabConfig.id}-tab-panel`}
                value={tab}
                index={tabConfig.id}
              >
                {tabConfig.component}
              </CustomTabPanel>
            ),
        )}
      </Box>
    </Box>
  )
}

export default ExperimentPage
