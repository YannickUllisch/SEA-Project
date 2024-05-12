import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import type { Experiment } from "@prisma/client";
import { useSession } from "@renderer/src/components/SessionProvider";
import { logout } from "@renderer/src/lib/logout";
import { Role } from "@renderer/src/lib/role";
import theme from "@renderer/src/lib/theme";
import {
  CirclePlay,
  Play,
  Settings,
  SquarePlus,
  UserRoundPlus,
  CirclePlus,
} from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AdminPage = () => {
  const router = useRouter();
  const session = useSession();

  const [experiments, setExperiments] = useState<Experiment[] | undefined>(
    undefined
  );

  // Waiting for backend response
  // biome-ignore lint/correctness/useExhaustiveDependencies: <Needed to fetch from backend>
  useEffect(() => {
    window.ipc.send("getExperiments", "");

    window.ipc.on("getExperiments", (experiments: Experiment[]) => {
      setExperiments(experiments);
    });
  }, [experiments === undefined]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 5,
          minWidth: "90%",
          minHeight: "500px",
          borderRadius: 4,
        }}
      >
        <Typography sx={{ fontSize: 40, fontWeight: "bold" }}>
          Experiments
        </Typography>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: " center",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {experiments
            ? experiments.map((experiment) => (
                <Card
                  key={experiment.title}
                  sx={{
                    boxShadow: 3,
                    minWidth: "20%",
                    m: 2,
                    borderRadius: 2,
                  }}
                >
                  <CardActionArea
                    onClick={() =>
                      router.push(`/admin/experiment/${experiment.id}`)
                    }
                    sx={{
                      cursor: "pointer",
                      height: "120px",
                    }}
                  >
                    <CardHeader
                      title={experiment.title}
                      subheader={experiment.description}
                    />
                  </CardActionArea>
                  <CardContent sx={{ padding: 0, height: "40px" }}>
                    <Divider />
                    <Box
                      sx={{
                        display: "flex",
                        marginTop: 1,
                        justifyContent: "center",
                        gap: 3,
                      }}
                    >
                      {session
                        ? session.user.role === Role.ADMIN && (
                            <>
                              <Tooltip title={"Add Questionnaire"}>
                                <SquarePlus
                                  style={{
                                    color: theme.palette.text.secondary,
                                    cursor: "pointer",
                                    strokeWidth: "1.5px",
                                  }}
                                />
                              </Tooltip>
                              <Tooltip title={"Add Assistant"}>
                                <UserRoundPlus
                                  style={{
                                    color: theme.palette.text.secondary,
                                    cursor: "pointer",
                                    strokeWidth: "1.5px",
                                  }}
                                />
                              </Tooltip>
                            </>
                          )
                        : null}

                      <Tooltip title={"Start Experiment"}>
                        <Play
                          onClick={() => router.push("/participant")}
                          style={{
                            color: "green",
                            cursor: "pointer",
                            strokeWidth: "1.5px",
                          }}
                        />
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              ))
            : undefined}
          <Box
            sx={{
              //boxShadow: 3,
              minWidth: "20%",
              m: 2,
              borderRadius: 2,
              height: 150,
              display: "flex",
              justifyContent: "center",
              //backgroundColor: "red",
              alignItems: "center",
            }}
          >
            <Tooltip title={"Create New Experiment"}>
              <CirclePlus
                style={{
                  height: 50,
                  width: 50,
                  color: "green",
                  cursor: "pointer",
                  strokeWidth: "1.5px",
                }}
              />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPage;
