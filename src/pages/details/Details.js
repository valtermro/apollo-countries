import { gql, useQuery } from '@apollo/client';
import { AppBar, Toolbar, Box, Container, Typography } from '@material-ui/core';
import { Anchor } from '../../components';
import CountryDetails from './CountryDetails';

export const GET_COUNTRY = gql`
  query GetCountry($id: String!) {
    countries: Country(_id: $id) {
      id: _id
      code: alpha3Code
      name
      capital
      population
      area
      topLevelDomains {
        name
      }
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

export default function Details({ match: { params } }) {
  const { data = {}, loading, error } = useQuery(GET_COUNTRY, {
    variables: { id: params.id }
  });
  const [country] = data.countries || [];

  return (
    <>
      <AppBar color='default'>
        <Container>
          <Toolbar>
            <Anchor to='/'>
              All countries
            </Anchor>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />

      <Container>
        {loading ? (
          <Message text='Loading...' />
        ) : error ? (
          <Message text='Failed to load.' />
        ) : (
          <Box display='flex' justifyContent='center' marginTop={4}>
            <CountryDetails country={country} />
          </Box>
        )}
      </Container>
    </>
  );
}
