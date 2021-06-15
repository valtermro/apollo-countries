import { render } from '@testing-library/react';
import { bra } from '../../../testing/fixtures/countries';
import CountryDetails from './CountryDetails';

describe('CountryDetails', () => {
  it('renders the flag', () => {
    const root = render(<CountryDetails country={bra} />);

    const imgEl = root.getByRole('img');
    expect(imgEl).toHaveAttribute('src', bra.flag.url);
    expect(imgEl).toHaveAttribute('alt', `${bra.name}'s flag`);
  });

  it('displays the name', () => {
    const root = render(<CountryDetails country={bra} />);

    root.getByText(`Name: ${bra.name}`);
  });

  it('displays the capital name, if available', () => {
    const root = render(<CountryDetails country={bra} />);

    root.getByText(`Capital: ${bra.capital}`);
  });

  it('displays a placeholder if the capital name is not available', () => {
    const root = render(<CountryDetails country={{ ...bra, capital: null }} />);

    root.getByText('Capital: N/A');
  });

  it('displays the area', () => {
    const root = render(<CountryDetails country={bra} />);

    root.getByText(`Area: ${bra.area.toLocaleString()} km²`);
  });

  it('displays the population', () => {
    const root = render(<CountryDetails country={bra} />);

    root.getByText(`Population: ${bra.population.toLocaleString()}`);
  });

  it('displays a comma separated list of the top level domains', () => {
    const topLevelDomains = [{ name: '.br' }, { name: '.com.br' }];
    const root = render(<CountryDetails country={{ ...bra, topLevelDomains }} />);

    root.getByText('TLDs: .br, .com.br');
  });
});
