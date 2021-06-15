import { Box, Button, Typography } from '@material-ui/core';
import EditForm from './EditForm';

export default function EditPanel({ editing, country, onClickEdit, onSubmit, onCancel }) {
  return (
    <Box marginTop={4}>
      {!editing ? (
        <Box display='flex' justifyContent='flex-end'>
          <Button variant='contained' color='secondary' onClick={onClickEdit}>
            Edit
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant='h2'>
            Edit country {country.code}
          </Typography>

          <Box marginTop={2}>
            <EditForm country={country} onSubmit={onSubmit} onCancel={onCancel} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
