import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  title: {
    fontSize: '38px',
    marginBottom: '10px'
  },
  toHomeLink: {
    fontSize: '20px'
  }
});

export default function PageNotFound() {
  const classes = useStyles();

  return (
    <Container>
      <Box padding={10} textAlign='center'>
        <Typography className={classes.title}>
          Page not found
        </Typography>

        <Link className={classes.toHomeLink} to='/'>
          Go back home.
        </Link>
      </Box>
    </Container>
  );
}
