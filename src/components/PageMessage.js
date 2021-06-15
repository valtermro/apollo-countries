import { Box, Typography } from '@material-ui/core';

export default function PageMessage({ text }) {
  return (
    <Box marginTop={10}>
      <Typography component='p' variant='h1' align='center'>
        {text}
      </Typography>
    </Box>
  );
}
