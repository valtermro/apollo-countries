import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Toolbar, Container, Typography } from '@material-ui/core';
import SearchForm from './SearchForm';
import CountryCardList from './CountryCardList';
import { GET_APP_STATE, GET_COUNTRIES } from '../../graphql/queries';

function Message({ text }) {
  return (
    <Box marginTop={10}>
      <Typography component='p' variant='h1' align='center'>
        {text}
      </Typography>
    </Box>
  );
}

function HeaderBar({ children, ...props }) {
  return (
    <Toolbar>
      <Box width={680} margin='auto' {...props}>
        {children}
      </Box>
    </Toolbar>
  );
}

export default function Dashboard() {
  const [searchStr, setSearchStr] = useState('');
  const { data: { appState } = {} } = useQuery(GET_APP_STATE);
  const { data: { countries } = {}, loading, error } = useQuery(
    GET_COUNTRIES,
    { variables: { search: searchStr } }
  );

  return (
    <>
      <HeaderBar paddingTop={4} paddingBottom={2}>
        <SearchForm onSubmit={setSearchStr} />
      </HeaderBar>

      <Container>
        {appState?.isLoadingCountries || loading ? (
          <Message text='Loading...' />
        ) : error ? (
          <Message text='Failed to load.' />
        ) : (
          <CountryCardList countries={countries} />
        )}
      </Container>
    </>
  );
}
