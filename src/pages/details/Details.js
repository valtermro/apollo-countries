import { useRouteMatch } from 'react-router-dom';
import { Box, Container, Typography } from '@material-ui/core';

export default function Details() {
  const match = useRouteMatch();
  const { id } = match.params;

  return (
    <Container>
      <Box textAlign='center' padding={8}>
        <Typography variant='h1'>
          Details for country id: {id}
        </Typography>
      </Box>
    </Container>
  );
}
