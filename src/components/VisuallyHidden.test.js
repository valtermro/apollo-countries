import { render, cleanup } from '@testing-library/react';
import VisuallyHidden from './VisuallyHidden';

describe('VisuallyHidden', () => {
  afterEach(cleanup);

  it('renders an element visible for screen readers', () => {
    const root = render(<VisuallyHidden>Foo</VisuallyHidden>);

    expect(root.getByText('Foo')).toBeVisible();
  });
});
