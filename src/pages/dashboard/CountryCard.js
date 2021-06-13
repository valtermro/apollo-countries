import {
  Box, Link, Typography,
  Card, CardHeader, CardMedia, CardContent, CardActions,
  makeStyles,
} from '@material-ui/core';

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
  header: {
    //
  },
  content: {
    //
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));


export default function CountryCard({ country }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.flagImage}
        component='img'
        image={country.flag.url}
        alt={`${country.name}'s flag`}
      />

      <Box flex={1}>
        <CardHeader
          className={classes.header}
          title={country.name}
        />
        <CardContent className={classes.content}>
          <Typography variant='h3'>
            Capital: {country.capital || 'N/A'}
          </Typography>
        </CardContent>

        <CardActions className={classes.actions}>
          <Link variant='button' href={`/country/${country.id}`}>
            See more
          </Link>
        </CardActions>
      </Box>
    </Card>
  );
}
