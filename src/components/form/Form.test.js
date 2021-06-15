import { render, cleanup, fireEvent } from '@testing-library/react';
import Form from './Form';

describe('Form', () => {
  afterEach(cleanup);

  it('renders an accessible form', () => {
    const root = render(<Form name='test' />);

    root.getByRole('form', { name: 'test' });
  });

  it('does not use native validation', () => {
    const root = render(<Form name='test' />);

    const formEl = root.queryByRole('form', { name: 'test' });
    expect(formEl).toHaveAttribute('novalidate');
  });
});
