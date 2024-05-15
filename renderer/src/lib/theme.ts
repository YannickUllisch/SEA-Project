import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import { Cabin } from 'next/font/google'

export const roboto = Cabin({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(27, 179, 148)',
      light: 'rgb(62, 226, 193)',
      dark: 'rgb(20, 164, 139)',
    },
    secondary: {
      main: '#4C2C96',
      dark: '#412681',
      light: '#8c6cd4',
    },
    error: {
      main: red.A400, // 'rgb(227,148,187)',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})

export default theme
