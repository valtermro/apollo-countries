import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    top: 0,
    left: 0,
    overflow: 'hidden',
    pointerEvents: 'none'
  }
});

export default function VisuallyHidden({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
}
