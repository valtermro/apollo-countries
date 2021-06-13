import { MemoryRouter } from 'react-router';
import { render as _render } from '@testing-library/react';
import Details from './Details';

function render(component) {
  return _render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
}

describe('Details page', () => {
  it('renders a link to the dashboard', () => {
    const root = render(<Details />);

    const linkEl = root.getByRole('link');
    expect(linkEl).toHaveAttribute('href', '/');
  });
});
