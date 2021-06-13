import { gql, useQuery } from '@apollo/client';
import { Box, Container, Typography } from '@material-ui/core';
import CountryCardList from './CountryCardList';

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries: Country {
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

export default function Dashboard() {
  const { data: { countries } = {}, loading, error } = useQuery(GET_COUNTRIES);

  if (loading)
    return <Message text='Loading...' />;

  if (error)
    return <Message text='Failed to load...' />;

  return (
    <Container>
      <CountryCardList countries={countries} />
    </Container>
  );
}
