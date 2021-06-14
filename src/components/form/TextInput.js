import { TextField } from '@material-ui/core';

export default function TextInput({ error, onChange, onValueChange, ...props }) {
  function handleChange(event) {
    if (onChange) onChange(event);
    if (onValueChange) onValueChange(event.target.value);
  }

  return (
    <TextField
      margin='normal'
      variant='outlined'
      fullWidth={true}
      error={!!error}
      helperText={error}
      inputProps={{ 'aria-label': props.name || props.label }}
      onChange={handleChange}
      {...props}
    />
  );
}
