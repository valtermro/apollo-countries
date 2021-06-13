import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import App from './App';
import theme from './theme';

const client = new ApolloClient({
  uri: 'http://testefront.dev.softplan.com.br',
  cache: new InMemoryCache()
});

ReactDOM.render((
  <React.StrictMode>
    <ApolloProvider client={client} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ApolloProvider >
  </React.StrictMode>
), document.getElementById('root'));
