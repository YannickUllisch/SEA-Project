import React from 'react'
import type { AppProps } from 'next/app'
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../src/lib/theme'
import '../styles/styles.css'
import { Box } from '@mui/material'
import SessionProvider from '@renderer/src/components/SessionProvider'
import Rerouter from '@renderer/src/components/Rerouter'
import Head from 'next/head'

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props
  return (
    <AppCacheProvider {...props}>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <Rerouter>
            <CssBaseline />
            <Head>
              <title>Survey System</title>
            </Head>
            <Box
              sx={{
                minHeight: 'calc(90vh - 90px)',
              }}
            >
              <Component {...pageProps} />
            </Box>
          </Rerouter>
        </ThemeProvider>
      </SessionProvider>
    </AppCacheProvider>
  )
}
