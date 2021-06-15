import ButtonBase from './ButtonBase';

export default function SubmitButton(props) {
  return (
    <ButtonBase
      type='submit'
      color='primary'
      {...props}
    />
  );
}
