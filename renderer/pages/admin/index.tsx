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
import type { dbExperiment } from '@prisma/client'
import { useSession } from '@renderer/src/components/SessionProvider'
import CreateExperimentModal from '@renderer/src/components/modals/createExperimentModal'
import { Role } from '@renderer/src/lib/role'
import theme from '@renderer/src/lib/theme'
import { Play, SquarePlus, UserRoundPlus, CirclePlus } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const AdminPage = () => {
  const router = useRouter()
  const session = useSession()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [experiments, setExperiments] = useState<dbExperiment[] | undefined>(
    undefined,
  )

  // Waiting for backend response
  // biome-ignore lint/correctness/useExhaustiveDependencies: <Needed to fetch from backend>
  useEffect(() => {
    window.ipc.send('getExperiments', '')

    window.ipc.on('getExperiments', (experiments: dbExperiment[]) => {
      setExperiments(experiments)
    })
  }, [experiments === undefined])

  useEffect(() => {
    window.ipc.on('createdExperiment', (message: string) => {
      toast.success(message)
      setExperiments(undefined)
    })

    window.ipc.on('failCreateExperiment', (message: string) => {
      toast.error(message)
    })
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
          minWidth: '95%',
          minHeight: '500px',
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
                          router.push(
                            `/admin/experiment/${experiment.experimentID}`,
                          )
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
                                  <Tooltip title={'Add Questionnaire'}>
                                    <SquarePlus
                                      style={{
                                        color: theme.palette.text.secondary,
                                        cursor: 'pointer',
                                        strokeWidth: '1.5px',
                                      }}
                                      onClick={() =>
                                        router.push(
                                          `/admin/experiment/${experiment.experimentID}`,
                                        )
                                      }
                                    />
                                  </Tooltip>
                                  <Tooltip title={'Add Assistant'}>
                                    <UserRoundPlus
                                      style={{
                                        color: theme.palette.text.secondary,
                                        cursor: 'pointer',
                                        strokeWidth: '1.5px',
                                      }}
                                    />
                                  </Tooltip>
                                </>
                              )
                            : null}

                          <Tooltip title={'Start Experiment'}>
                            <Play
                              onClick={() => router.push('/participant')}
                              style={{
                                color: 'green',
                                cursor: 'pointer',
                                strokeWidth: '1.5px',
                              }}
                            />
                          </Tooltip>
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
                        transition: 'transform 0.2s', // Adding transition for smooth effect
                        '&:hover': {
                          // Defining styles for hover state
                          transform: 'scale(1.1)', // Increase size on hover
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
