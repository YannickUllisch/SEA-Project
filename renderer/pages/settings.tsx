import { Box, ButtonBase, Divider, Tooltip, Typography } from '@mui/material'
import type { dbUser } from '@prisma/client'
import { useSession } from '@renderer/src/components/SessionProvider'
import AddUserDialog from '@renderer/src/components/modals/addUserDialog'
import { Role } from '@renderer/src/lib/role'
import { UserRoundPlus, UserRoundX } from 'lucide-react'
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from '@mui/x-data-grid'
import router from 'next/router'

interface AdminTableRow {
  id: string
  name: string
}

const settingsPage = () => {
  const session = useSession()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [admins, setAdmins] = useState<dbUser[] | undefined>(undefined)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <needed for items to be fetched>
  useEffect(() => {
    window.ipc.send('getAdmins', router.query.id)
    window.ipc.on('getAdmins', (admins: dbUser[]) => {
      setAdmins(admins)
    })
  }, [admins === undefined])

  useEffect(() => {
    window.ipc.on('deletedAdmin', (message: string) => {
      toast.error(message)
    })
  }, [])

  useEffect(() => {
    window.ipc.on('addedAdmin', (message: string) => {
      toast.success(message)
    })
  }, [])

  const columns: GridColDef<AdminTableRow>[] = [
    {
      field: 'id',
      headerName: 'ID',
      hideable: true,
      valueFormatter: () => {
        return '#'
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          label="delete"
          icon={
            <Tooltip title={'Remove Admin'}>
              <UserRoundX color="red" />
            </Tooltip>
          }
          onClick={() => onDelete(params.row.id)}
        />,
      ],
      width: 110,
      editable: false,
      flex: 1,
    },
  ]

  const tableData: AdminTableRow[] = useMemo(() => {
    const data: AdminTableRow[] = []

    if (admins) {
      for (const admin of admins) {
        data.push({ id: admin.id, name: admin.name })
      }
    }

    return data
  }, [admins])

  const onDelete = (userID: string) => {
    window.ipc.send('deleteAdmins', { userID })
    setAdmins(undefined)
  }

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
              <>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'transform 0.2s', // Adding transition for smooth effect
                    width: '25%',
                    padding: 2,
                    borderRadius: 2,
                    '&:hover': {
                      // Defining styles for hover state
                      transform: 'scale(1.025)', // Increase size on hover
                    },
                  }}
                >
                  <ButtonBase onClick={() => setIsDialogOpen(true)}>
                    <Typography
                      variant="body1"
                      sx={{
                        cursor: 'pointer', // Optional: to make it look clickable
                        marginLeft: 1, // Adjust as needed for spacing between the button and text
                        marginTop: 1,
                      }}
                    >
                      Add Admin
                    </Typography>
                  </ButtonBase>
                  <Tooltip title="Add Admin">
                    <UserRoundPlus
                      style={{
                        height: 35,
                        width: 35,
                        color: 'green',
                        cursor: 'pointer',
                        strokeWidth: '1.5px',
                      }}
                      onClick={() => setIsDialogOpen(true)}
                    />
                  </Tooltip>
                </Box>
                <Box
                  sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'auto',
                  }}
                >
                  <DataGrid
                    rows={tableData}
                    columns={columns}
                    autoHeight
                    disableColumnResize={true}
                    disableColumnMenu={true}
                  />
                </Box>
              </>
            )
          : undefined}
      </Box>
    </Box>
  )
}
export default settingsPage
