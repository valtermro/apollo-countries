import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  flag: {
    display: 'block',
    maxWidth: '60%',
    margin: 'auto',
    marginBottom: '20px'
  }
});

function renderOrNa(obj, mapper = p => p) {
  return obj ? mapper(obj) : 'N/A';
}

export default function DetailsPanel({ country }) {
  const classes = useStyles();

  return (
    <Box>
      <img
        className={classes.flag}
        src={country.flag.url}
        alt={`${country.name}'s flag`} />

      <Typography component='p'>
        Name: {country.name}
      </Typography>

      <Typography component='p'>
        Capital: {renderOrNa(country.capital)}
      </Typography>

      <Typography component='p'>
        Area: {renderOrNa(country.area, p => `${p.toLocaleString()} km²`)}
      </Typography>

      <Typography component='p'>
        Population: {renderOrNa(country.population, p => p.toLocaleString())}
      </Typography>

      <Typography component='p'>
        TLDs: {renderOrNa(country.topLevelDomains, p => p.map(q => q.name).join(', '))}
      </Typography>
    </Box>
  );
}
