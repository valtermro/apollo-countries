import { MemoryRouter } from 'react-router';
import { render as _render, cleanup } from '@testing-library/react';
import CountryCard from './CountryCard';

function render(component) {
  return _render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
}

describe('CountryCard', () => {
  const country = {
    id: '1',
    code: 'CA1',
    name: 'Country 1',
    capital: 'Capital 1',
    flag: { url: 'flag1.svg' }
  };

  afterEach(cleanup);

  it('renders the flag', () => {
    const root = render(<CountryCard country={country} />);

    const imgEl = root.getByRole('img');
    expect(imgEl).toHaveAttribute('src', country.flag.url);
    expect(imgEl).toHaveAttribute('alt', `${country.name}'s flag`);
  });

  it('displays the name', () => {
    const root = render(<CountryCard country={country} />);

    root.getByText('Country 1');
  });

  it('displays the capital name, if available', () => {
    const root = render(<CountryCard country={country} />);

    root.getByText('Capital: Capital 1');
  });

  it('displays a placeholder if the capital name is not available', () => {
    const root = render(<CountryCard country={{ ...country, capital: null }} />);

    root.getByText('Capital: N/A');
  });

  it('displays a link to the details page', () => {
    const root = render(<CountryCard country={country} />);

    const anchorEl = root.getByRole('link');
    expect(anchorEl).toHaveAttribute('href', `/country/${country.id}`);
  });
});
