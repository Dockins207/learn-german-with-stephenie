import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthProvider } from '@/context/AuthContext'

const theme = createTheme();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}
