import { AppBar, Box, Container, Toolbar } from '@material-ui/core';

export default function PageTopbar({ position = 'fixed', children }) {
  return (
    <>
      <AppBar position={position} variant='outlined' color='default'>
        <Container>
          <Toolbar>
            {children}
          </Toolbar>
        </Container>
      </AppBar>
      <Box marginBottom={2}>
        <Toolbar />
      </Box>
    </>
  );
}
