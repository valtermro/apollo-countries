import { render } from '@testing-library/react';
import CountryDetails from './CountryDetails';

describe('CountryDetails', () => {
  const country = {
    id: '1',
    code: 'CD1',
    name: 'Country 1',
    capital: 'Capital 1',
    area: 42000,
    population: 42000000,
    flag: { url: 'flag1.svg' },
    topLevelDomains: [{ name: '.ct' }, { name: '.ct.br' }]
  };

  it('renders the flag', () => {
    const root = render(<CountryDetails country={country} />);

    const imgEl = root.getByRole('img');
    expect(imgEl).toHaveAttribute('src', country.flag.url);
    expect(imgEl).toHaveAttribute('alt', `${country.name}'s flag`);
  });

  it('displays the name', () => {
    const root = render(<CountryDetails country={country} />);

    root.getByText('Name: Country 1');
  });

  it('displays the capital name, if available', () => {
    const root = render(<CountryDetails country={country} />);

    root.getByText('Capital: Capital 1');
  });

  it('displays a placeholder if the capital name is not available', () => {
    const root = render(<CountryDetails country={{ ...country, capital: null }} />);

    root.getByText('Capital: N/A');
  });

  it('displays the area', () => {
    const root = render(<CountryDetails country={country} />);

    root.getByText('Area: 42,000 km²');
  });

  it('displays the population', () => {
    const root = render(<CountryDetails country={country} />);

    root.getByText('Population: 42,000,000');
  });

  it('displays the top level domains separated by commas', () => {
    const root = render(<CountryDetails country={country} />);

    root.getByText('TLDs: .ct, .ct.br');
  });
});
