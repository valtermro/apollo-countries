import { Button } from '@material-ui/core';

export default function ButtonBase({ margin = '0 4px', minWidth = '120px', ...props}) {
  return (
    <Button
      variant='contained'
      style={{ margin, minWidth }}
      {...props}
    />
  );
}
