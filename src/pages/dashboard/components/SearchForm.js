import { useState } from 'react';
import { Box } from '@material-ui/core';
import { Form, TextInput, SubmitButton } from '../../../components/form';

export default function SearchForm({ onSubmit }) {
  const [search, setSearch] = useState('');

  function handleSubmit() {
    onSubmit(search);
  }

  return (
    <Form role='search' name='Search countries' onSubmit={handleSubmit}>
      <Box display='flex' alignItems='center'>
        <TextInput
          type='search'
          label='Search countries'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <Box display='flex' height='56px' marginTop='8px'>
          <SubmitButton minWidth='auto'>Search</SubmitButton>
        </Box>
      </Box>
    </Form>
  );
}
