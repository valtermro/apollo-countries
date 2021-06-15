import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { typeDefs, typePolicies } from './graphql/types';
import App from './App';
import theme from './theme';
import { GET_APP_STATE, GET_COUNTRIES } from './graphql/queries';

const client = new ApolloClient({
  typeDefs,
  uri: 'http://testefront.dev.softplan.com.br',
  cache: new InMemoryCache({ typePolicies })
});

async function loadInitialState() {
  await client.query({ query: GET_COUNTRIES });

  client.cache.writeQuery({
    query: GET_APP_STATE,
    data: { appState: { isLoadingCountries: false } }
  });
}

loadInitialState();

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
