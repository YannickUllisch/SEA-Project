import React from 'react'
import type { AppProps } from 'next/app'
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../src/lib/theme'
import '../styles/styles.css'
import { Box } from '@mui/material'
import SessionProvider from '@renderer/src/components/SessionProvider'
import Head from 'next/head'
import { Toaster } from 'sonner'
import Footer from '@renderer/src/components/Footer'
import AuthRerouter from '@renderer/src/components/AuthRerouter'
import Header from '@renderer/src/components/Header'

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props
  return (
    <AppCacheProvider {...props}>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <AuthRerouter>
            <CssBaseline />
            <Head>
              <title>Survey System</title>
            </Head>
            <Header />
            <Box
              sx={{
                minHeight: 'calc(100vh - 70px)',
              }}
            >
              <Component {...pageProps} />
            </Box>
            <Footer />
            <Toaster closeButton theme={'light'} />
          </AuthRerouter>
        </ThemeProvider>
      </SessionProvider>
    </AppCacheProvider>
  )
}
