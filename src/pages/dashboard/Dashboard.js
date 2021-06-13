import { Container } from '@material-ui/core';
import CountryCardList from './CountryCardList';

export default function Dashboard() {
  const countries = [
    {
      id: '1',
      code: 'BRA',
      name: 'Brazil',
      capital: 'Brasília',
      flag: { url: 'https://restcountries.eu/data/bra.svg' }
    },
    {
      id: '2',
      code: 'ARG',
      name: 'Argentina',
      capital: 'Buenos Aires',
      flag: { url: 'https://restcountries.eu/data/arg.svg' }
    },
    {
      id: '3',
      code: 'USA',
      name: 'United States of America',
      capital: 'Washington, D.C.',
      flag: { url: 'https://restcountries.eu/data/usa.svg' }
    },
  ];

  return (
    <Container>
      <CountryCardList countries={countries}  />
    </Container>
  );
}
