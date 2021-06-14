import ButtonBase from './ButtonBase';

export default function CancelButton(props) {
  return (
    <ButtonBase
      type='submit'
      color='primary'
      {...props}
    />
  );
}
