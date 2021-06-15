import {
  Box, Typography, Card as MuiCard, CardHeader, CardMedia, CardContent, CardActions,
  makeStyles
} from '@material-ui/core';
import { Anchor } from '../../../components';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    }
  },
  flagImage: {
    borderRight: '1px solid #f0f0f0',
    flexShrink: 0,
    maxHeight: '240px',
    [theme.breakpoints.up('sm')]: {
      maxHeight: '180px',
      width: '360px',
    }
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

export default function Card({ country }) {
  const classes = useStyles();

  return (
    <MuiCard className={classes.root}>
      <CardMedia
        className={classes.flagImage}
        component='img'
        image={country.flag.url}
        alt={`${country.name}'s flag`}
      />

      <Box flex={1}>
        <CardHeader
          title={country.name}
        />
        <CardContent>
          <Typography variant='h3'>
            Capital: {country.capital || 'N/A'}
          </Typography>
        </CardContent>

        <CardActions className={classes.actions}>
          <Anchor to={`/country/${country.id}`}>
            See more
          </Anchor>
        </CardActions>
      </Box>
    </MuiCard>
  );
}
