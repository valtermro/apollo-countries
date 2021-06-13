import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function Anchor(props) {
  return <Button role='link' color='primary' component={Link} {...props} />;
}
