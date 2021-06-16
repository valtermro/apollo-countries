import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Container } from '@material-ui/core';
import { GET_APP_STATE, GET_COUNTRIES } from '../../graphql/queries';
import { PageMessage, PageTopbar, VisuallyHidden } from '../../components';
import SearchForm from './components/SearchForm';
import CardList from './components/CardList';

export default function DashboardPage() {
  const [searchStr, setSearchStr] = useState('');
  const { data: { appState } = {} } = useQuery(GET_APP_STATE);
  const { data: { countries } = {}, loading, error } = useQuery(
    GET_COUNTRIES,
    { variables: { search: searchStr } }
  );

  return (
    <>
      <VisuallyHidden>
        <h1>Apollo countries</h1>
      </VisuallyHidden>

      <PageTopbar>
        <Box width={680} margin='auto'>
          <SearchForm onSubmit={setSearchStr} />
        </Box>
      </PageTopbar>

      <Container>
        {appState?.isLoadingCountries || loading ? (
          <PageMessage text='Loading...' />
        ) : error ? (
          <PageMessage text='Failed to load.' />
        ) : (
          <CardList countries={countries} />
        )}
      </Container>
    </>
  );
}
