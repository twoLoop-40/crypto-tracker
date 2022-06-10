import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import Router from './Router';
import { GlobalStyle } from './styles/reset';
import { darkTheme, lightTheme } from './styles/theme';
import { ReactQueryDevtools } from 'react-query/devtools'
import { HelmetProvider } from 'react-helmet-async';
import { StateCarrier } from './apis/UserTypes';

const queryClient = new QueryClient()

export const themeCarrier = new StateCarrier<boolean>()

function App() {
  const [mode, setMode] = useState<boolean>(true)
  themeCarrier.addStateAction(setMode)
  themeCarrier.addState(mode)
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={mode ? darkTheme : lightTheme}>
        <GlobalStyle />
       
        <HelmetProvider>
        
          <Router />
        </HelmetProvider>
        
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>       
    </QueryClientProvider>
    
  );
}

export default App;
