import { Box, Tooltip, Typography, ButtonBase } from '@mui/material'
import AddUserDialog from '@renderer/src/components/modals/addUserDialog'
import { UserRoundPlus, UserRoundX } from 'lucide-react'
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from '@mui/x-data-grid'
import type { dbUser } from '@prisma/client'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

interface AssistantTableRow {
  id: string
  name: string
}

const AssistantsTab = () => {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [assistants, setAssistants] = useState<dbUser[] | undefined>(undefined)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <needed for items to be fetched>
  useEffect(() => {
    window.ipc.send('getAssistants', { experimentID: router.query.id })
    window.ipc.on('getAssistants', (assistants: dbUser[]) => {
      setAssistants(assistants)
    })
  }, [assistants === undefined])

  useEffect(() => {
    window.ipc.on('addedAssistant', () => {
      setAssistants(undefined)
    })

    window.ipc.on('deletedAssistant', (message: string) => {
      toast.error(message)
    })

    return () => {
      // Clean up event listeners to prevent multiple toasts
      window.ipc.removeAllListeners('addedAssistant')
      window.ipc.removeAllListeners('deletedAssistant')
    }
  }, [])

  const columns: GridColDef<AssistantTableRow>[] = [
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
            <Tooltip title={'Remove Assistant'}>
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

  const tableData: AssistantTableRow[] = useMemo(() => {
    const data: AssistantTableRow[] = []

    if (assistants) {
      for (const assistant of assistants) {
        data.push({ id: assistant.id, name: assistant.name })
      }
    }

    return data
  }, [assistants])

  const onDelete = (userID: string) => {
    window.ipc.send('deleteAssistant', { userID })
    setAssistants(undefined)
  }

  return (
    <>
      <AddUserDialog
        open={isDialogOpen}
        roleToAdd={10}
        setOpen={setIsDialogOpen}
        experimentId={router.query.id as string}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          transition: 'transform 0.2s', // Adding transition for smooth effect
          width: '25%',
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
            }}
          >
            Add Assistant
          </Typography>
        </ButtonBase>
        <Tooltip title="Add Assistant">
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
}

export default AssistantsTab
