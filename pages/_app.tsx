import React, { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { Provider } from 'react-redux';
import { store } from '../src/store';


 const MyApp = (props) => {
  const { Component, pageProps } = props; 

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Lista de Tarefas</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Provider store={ store }>
            <Component {...pageProps} />
          </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
