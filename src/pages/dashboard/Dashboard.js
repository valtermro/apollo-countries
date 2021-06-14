import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Toolbar, Container, Typography } from '@material-ui/core';
import SearchForm from './SearchForm';
import CountryCardList from './CountryCardList';

export const GET_COUNTRIES = gql`
  query  GetCountries($search: String) {
    countries: Country(
      filter: { OR: [{ name_contains: $search }, { alpha3Code_contains: $search }] }
    ) {
      id: _id
      code: alpha3Code
      name
      capital
      flag {
       url: svgFile
      }
    }
  }
`;

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
        {loading ? (
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
