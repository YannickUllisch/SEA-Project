import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material'
import { useSession } from '@renderer/src/components/SessionProvider'
import CreateExperimentModal from '@renderer/src/components/modals/createExperimentModal'
import { Role } from '@renderer/src/lib/role'
import theme from '@renderer/src/lib/theme'
import { CirclePlus, UserRoundPlus } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import AddUserDialog from '@renderer/src/components/modals/addUserDialog'
import type { FrontendExperiment } from '@renderer/src/lib/types'

const AdminPage = () => {
  const router = useRouter()
  const session = useSession()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAssistantDialogOpen, setIsAssistantDialogOpen] = useState(false)
  const [experiments, setExperiments] = useState<
    FrontendExperiment[] | undefined
  >(undefined)

  useEffect(() => {
    window.ipc.send('getExperiments', '')

    window.ipc.on('getExperiments', (experiments: FrontendExperiment[]) => {
      setExperiments(experiments)
    })

    return () => {
      window.ipc.removeAllListeners('getExperiments')
    }
  }, [experiments === undefined])

  useEffect(() => {
    window.ipc.on('createdExperiment', (message: string) => {
      toast.success(message)
      setExperiments(undefined)
    })

    window.ipc.on('failCreateExperiment', (message: string) => {
      toast.error(message)
    })

    window.ipc.on('addedAssistant', (message: string) => {
      toast.success(message)
    })

    window.ipc.on('failAddUser', (message: string) => {
      toast.error(message)
    })

    return () => {
      window.ipc.removeAllListeners('createdExperiment')
      window.ipc.removeAllListeners('failCreateExperiment')
      window.ipc.removeAllListeners('addedAssistant')
      window.ipc.removeAllListeners('failAddUser')
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 5,
          minWidth: '100%',
          minHeight: 'screen',
          borderRadius: 4,
        }}
      >
        <Typography sx={{ fontSize: 30, fontWeight: 'bold' }}>
          Experiments
        </Typography>

        <Divider />
        <Box
          sx={{
            justifyContent: 'center',
            alignItems: ' center',
            display: 'flex',
            mt: 1,
            flexWrap: 'wrap',
          }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {experiments
              ? experiments.map((experiment) => (
                  <Grid item xs={2} sm={4} md={4} key={experiment.title}>
                    <Card
                      key={experiment.title}
                      sx={{
                        boxShadow: 3,
                        minWidth: '20%',
                        m: 2,
                        borderRadius: 2,
                      }}
                    >
                      <CardActionArea
                        onClick={() =>
                          router.push(`/admin/experiment/${experiment.id}`)
                        }
                        sx={{
                          cursor: 'pointer',
                          height: '120px',
                        }}
                      >
                        <CardHeader
                          title={experiment.title}
                          subheader={experiment.description}
                        />
                      </CardActionArea>
                      <CardContent sx={{ padding: 0, height: '40px' }}>
                        <Divider />
                        <Box
                          sx={{
                            display: 'flex',
                            marginTop: 1,
                            justifyContent: 'center',
                            gap: 3,
                          }}
                        >
                          {session
                            ? session.user.role <= Role.ADMIN && (
                                <>
                                  <AddUserDialog
                                    open={isAssistantDialogOpen}
                                    roleToAdd={10}
                                    setOpen={setIsAssistantDialogOpen}
                                    experimentId={experiment.id}
                                  />
                                  <Tooltip title={'Add Assistant'}>
                                    <UserRoundPlus
                                      style={{
                                        color: theme.palette.text.secondary,
                                        cursor: 'pointer',
                                        strokeWidth: '1.5px',
                                      }}
                                      onClick={() =>
                                        setIsAssistantDialogOpen(true)
                                      }
                                    />
                                  </Tooltip>
                                </>
                              )
                            : null}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : undefined}
            <Grid item xs={2} sm={4} md={4}>
              {session
                ? session.user.role <= Role.ADMIN && (
                    <Box
                      sx={{
                        minWidth: '20%',
                        m: 2,
                        borderRadius: 2,
                        height: 150,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <Tooltip title={'Create New Experiment'}>
                        <CirclePlus
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
            </Grid>
          </Grid>
        </Box>
        <CreateExperimentModal open={isDialogOpen} setOpen={setIsDialogOpen} />
      </Box>
    </Box>
  )
}

export default AdminPage
