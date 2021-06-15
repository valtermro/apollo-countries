import { render, cleanup } from '@testing-library/react';
import PageMessage from './PageMessage';

describe('PageMessage', () => {
  afterEach(cleanup);

  it('renders a simple text', () => {
    const root = render(<PageMessage text='Foo' />);

    expect(root.getByText('Foo')).toBeInstanceOf(HTMLParagraphElement);
  });
});
