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
import { Toaster } from 'sonner'
import Footer from '@renderer/src/components/Footer'

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
                minHeight: 'calc(100vh - 70px)',
              }}
            >
              <Component {...pageProps} />
            </Box>
            <Footer />
            <Toaster closeButton theme={'light'} />
          </Rerouter>
        </ThemeProvider>
      </SessionProvider>
    </AppCacheProvider>
  )
}
