import { Suspense } from 'preact/compat';
import { useLayoutEffect, useMemo, useState } from 'preact/hooks'
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import AppRouter from './app-router';
import FallBack from './components/common/fallback';
import ColorModeContext from './ColorModeContext';
import LoadingContext from './LoaderContext';
import theming from './theme/';
import ProgressBar from './components/common/progress-bar';
import { AUTH_TOKEN } from './utils/constants';
import { useAppDispatch } from './app/hooks';
import { loginUser } from './redux/users/user.reducer';
import Alert from './components/common/alert.component'


export function App() {
  const dispatch = useAppDispatch()
  const [mode, setMode] = useState<PaletteMode>('light');
  
  useLayoutEffect(() => {
    const admin = localStorage.getItem(AUTH_TOKEN)    
    if (admin) {
      const data = JSON.parse(admin)
      dispatch(loginUser(data))
    }
  }, [dispatch])

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  const Loading = useMemo(() => ({
    Loading: () => <ProgressBar size={30} />
  }), [])
  const theme = useMemo(() => createTheme(theming(mode)), [mode]);

  return (
  <SnackbarProvider maxSnack={3}>
    <Alert>
      <ColorModeContext.Provider value={colorMode}>
        <LoadingContext.Provider value={Loading}>
          <ThemeProvider theme={theme}>
            <Router>
              <Suspense fallback={<FallBack />}>
                  <AppRouter />
              </Suspense>
            </Router>
          </ThemeProvider>
        </LoadingContext.Provider>
      </ColorModeContext.Provider>
    </Alert>
  </SnackbarProvider>
  )
}
