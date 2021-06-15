import { Box, List, ListItem, Typography } from '@material-ui/core';
import Card from './Card';

function Empty() {
  return (
    <Box textAlign='center' marginTop={5}>
      <Typography component='p' variant='h1'>
        Nothing here.
      </Typography>
    </Box>
  );
}

export default function CardList({ countries }) {
  if (!countries?.length)
    return <Empty />;

  return (
    <List>
      {countries.map(country => (
        <ListItem key={country.code}>
          <Card country={country} />
        </ListItem>
      ))}
    </List>
  );
}
