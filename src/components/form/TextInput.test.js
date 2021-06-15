import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from './TextInput';

describe('TextInput', () => {
  afterEach(cleanup);

  it('renders a textfield', () => {
    const root = render(<TextInput label='Test' />);

    root.getByRole('textbox', { name: 'Test' });
  });

  it('contains the given value', () => {
    const root = render(<TextInput label='Test' value='Test value' />);

    const inputEl = root.queryByRole('textbox', { name: 'Test' });
    expect(inputEl).toHaveValue('Test value');
  });

  it('fires the onValueChange event', () => {
    const onValueChange = jest.fn();
    const root = render(<TextInput label='Test' onValueChange={onValueChange} />);

    const inputEl = root.queryByRole('textbox', { name: 'Test' });
    userEvent.type(inputEl, 'Text');

    expect(onValueChange).toHaveBeenCalledTimes(4);
    expect(onValueChange).toHaveBeenCalledWith('T');
    expect(onValueChange).toHaveBeenCalledWith('Te');
    expect(onValueChange).toHaveBeenCalledWith('Tex');
    expect(onValueChange).toHaveBeenCalledWith('Text');
    expect(inputEl).toHaveValue('Text');
  });
});
