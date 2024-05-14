import { Box, Divider, Tooltip, Typography } from "@mui/material";
import { useSession } from "@renderer/src/components/SessionProvider";
import AddUserDialog from "@renderer/src/components/modals/addUserDialog";
import { Role } from "@renderer/src/lib/role";
import { UserRoundPlus, UserRoundX } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const AssistantsTab = () => {
  const session = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
          minWidth: "95%",
          minHeight: "500px",
          borderRadius: 4,
        }}
      >
        <AddUserDialog
          open={isDialogOpen}
          roleToAdd={10}
          setOpen={setIsDialogOpen}
        />
        <div>Assistant page </div>
        {session &&
          (session.user.role === Role.ADMIN ||
            session.user.role === Role.OWNER) && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  minWidth: "20%",
                  m: 2,
                  borderRadius: 2,
                  height: 150,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "transform 0.2s", // Adding transition for smooth effect
                  "&:hover": {
                    // Defining styles for hover state
                    transform: "scale(1.1)", // Increase size on hover
                  },
                }}
              >
                <Tooltip title={"Add Assistant"}>
                  <UserRoundPlus
                    style={{
                      height: 50,
                      width: 50,
                      color: "green",
                      cursor: "pointer",
                      strokeWidth: "1.5px",
                    }}
                    onClick={() => setIsDialogOpen(true)}
                  />
                </Tooltip>
              </Box>
              <Box
                sx={{
                  minWidth: "20%",
                  m: 2,
                  borderRadius: 2,
                  height: 150,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "transform 0.2s", // Adding transition for smooth effect
                  "&:hover": {
                    transform: "scale(1.1)", // Increase size on hover
                  },
                }}
              >
                <Tooltip title={"Remove Assistant"}>
                  <UserRoundX
                    style={{
                      height: 50,
                      width: 50,
                      color: "red",
                      cursor: "pointer",
                      strokeWidth: "1.5px",
                    }}
                    //onClick={() => }
                  />
                </Tooltip>
              </Box>
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default AssistantsTab;
