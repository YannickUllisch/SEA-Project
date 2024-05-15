import { Box, ButtonBase, Divider, Tooltip, Typography } from '@mui/material'
import { useSession } from '@renderer/src/components/SessionProvider'
import AddUserDialog from '@renderer/src/components/modals/addUserDialog'
import { Role } from '@renderer/src/lib/role'
import { UserRoundPlus } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

const settingsPage = () => {
  const session = useSession()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
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
        <AddUserDialog
          open={isDialogOpen}
          roleToAdd={1}
          setOpen={setIsDialogOpen}
        />
        <Typography sx={{ fontSize: 30, fontWeight: 'bold' }}>
          Settings
        </Typography>
        <Divider />
        {session
          ? session.user.role === Role.OWNER && (
              <Box
                sx={{
                  minWidth: '20%',
                  m: 2,
                  borderRadius: 2,
                  height: 150,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'transform 0.2s', // Adding transition for smooth effect
                  '&:hover': {
                    // Defining styles for hover state
                    transform: 'scale(1.1)', // Increase size on hover
                  },
                }}
              >
                <ButtonBase onClick={() => setIsDialogOpen(true)}>
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: 'pointer', // Optional: to make it look clickable
                      marginLeft: 1, // Adjust as needed for spacing between the button and text
                    }}
                  >
                    Add Admin
                  </Typography>
                </ButtonBase>
                <Tooltip title={'Add Admin'}>
                  <UserRoundPlus
                    style={{
                      height: 50,
                      width: 50,
                      color: 'green',
                      cursor: 'pointer',
                      strokeWidth: '1.5px',
                    }}
                    onClick={() => setIsDialogOpen(true)}
                  />
                </Tooltip>
              </Box>
            )
          : undefined}
      </Box>
    </Box>
  )
}
export default settingsPage
