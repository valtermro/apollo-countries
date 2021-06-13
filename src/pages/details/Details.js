import { AppBar, Toolbar, Box, Container } from '@material-ui/core';
import { Anchor } from '../../components';
import CountryDetails from './CountryDetails';

export default function Details() {
  const country = {
    code: 'BRA',
    name: 'Brazil',
    capital: 'Brasília',
    population: 206135893,
    area: 8515767,
    topLevelDomains: [
      { name: '.br' }
    ],
    flag: {
      url: 'https://restcountries.eu/data/bra.svg'
    }
  };

  return (
    <>
      <AppBar color='default'>
        <Toolbar>
          <Anchor to='/'>
            All countries
          </Anchor>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Container>
        <Box display='flex' justifyContent='center' marginTop={4}>
          <CountryDetails country={country} />
        </Box>
      </Container>
    </>
  );
}
