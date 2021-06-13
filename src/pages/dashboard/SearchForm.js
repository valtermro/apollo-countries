import { Box, Button, TextField, makeStyles } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%'
  },
  searchInput: {
    marginRight: 8
  }
});

export default function SearchForm({ onSubmit }) {
  const [search, setSearch] = useState('');
  const classes = useStyles();

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(search);
  }

  return (
    <form role='search' className={classes.root} onSubmit={handleSubmit}>
      <Box display='flex' height='100%'>
        <TextField
          label='Search countries'
          className={classes.searchInput}
          value={search}
          onChange={e => setSearch(e.target.value)}
          variant='filled'
          fullWidth={true}
          InputProps={{ role: 'searchbox' }}
        />

        <Button type='submit' variant='contained' color='primary'>
          Search
        </Button>
      </Box>
    </form>
  );
}
