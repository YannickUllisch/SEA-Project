import { Box, Button, Tooltip, Typography } from "@mui/material";
import React from "react";
import theme from "../lib/theme";
import { useRouter } from "next/router";
import { useSession } from "./SessionProvider";
import { logout } from "@renderer/src/lib/logout";
import { HomeIcon, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import logo from "@renderer/public/images/logo.png";
import { Role } from "@renderer/src/lib/role";

const Header = () => {
  const router = useRouter()
  const session = useSession()

  return (
    <>
      {router.pathname !== '/' && (
        <Box
          sx={{
            height: '70px',
            width: '100%',
            display: 'flex',
            backgroundColor: 'white',
            margin: '0 auto',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ ml: 3, mt: 1 }}>
            <Image src={logo} width={60} height={60} alt="AB Testing Logo" />
          </Box>
          {session && (
            <Box>
              <Button
                onClick={() => router.push('/admin')}
                sx={{ color: theme.palette.text.secondary }}
              >
                Home
              </Button>
              <Button
                onClick={() => router.push('/admin/experiment/surveycreation')}
                sx={{ color: theme.palette.text.secondary }}
              >
                Creator
              </Button>
            </Box>
          )}
          <Box>
            {session
              ? session.user.role === Role.OWNER && (
                  <Tooltip title={"Settings"}>
                    <Button
                      sx={{
                        color: theme.palette.text.secondary,
                        "&:hover": {
                          backgroundColor: "inherit",
                          textDecoration: "underline",
                        },
                      }}
                      variant="text"
                      onClick={() => router.push("/settings")}
                    >
                      <Settings />
                    </Button>
                  </Tooltip>
                )
              : undefined}
            {!session ? (
              <Button
                sx={{
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    backgroundColor: 'inherit',
                    textDecoration: 'underline',
                  },
                  gap: 0.5,
                }}
                variant="text"
                onClick={() => router.push('/')}
              >
                Login
              </Button>
            ) : (
              <Tooltip title={'Logout'}>
                <Button
                  sx={{
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      backgroundColor: 'inherit',
                      textDecoration: 'underline',
                    },
                    ml: -2,
                    mr: 2,
                  }}
                  variant="text"
                  onClick={logout}
                >
                  <LogOut />
                </Button>
              </Tooltip>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

export default Header
