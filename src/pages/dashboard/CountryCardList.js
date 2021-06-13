import { Box, List, ListItem, Typography } from '@material-ui/core';
import CountryCard from './CountryCard';

function Empty() {
  return (
    <Box textAlign='center' marginTop={5}>
      <Typography component='p' variant='h1'>
        Nothing here.
      </Typography>
    </Box>
  );
}

export default function CountryCardList({ countries }) {
  if (!countries?.length)
    return <Empty />;

  return (
    <List>
      {countries.map(country => (
        <ListItem key={country.code}>
          <CountryCard country={country} />
        </ListItem>
      ))}
    </List>
  );
}
