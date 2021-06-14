import { Button } from '@material-ui/core';

export default function ButtonBase({ margin, ...props }) {
  return (
    <Button
      variant='contained'
      style={{ margin: margin || '0 4px', minWidth: '120px' }}
      {...props}
    />
  );
}
