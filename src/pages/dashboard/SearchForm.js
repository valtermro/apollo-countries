import { useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { Form, TextInput, SubmitButton } from '../../components/form';

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

  function handleSubmit() {
    onSubmit(search);
  }

  return (
    <Form className={classes.root} role='search' name='Search countries' onSubmit={handleSubmit}>
      <Box display='flex' height='100%'>
        <TextInput
          label='Search countries'
          className={classes.searchInput}
          value={search}
          onChange={e => setSearch(e.target.value)}
          variant='filled'
          fullWidth={true}
          InputProps={{ role: 'searchbox' }}
        />

        <SubmitButton>
          Search
        </SubmitButton>
      </Box>
    </Form>
  );
}
