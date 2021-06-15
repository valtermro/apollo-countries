import { cleanup } from '@testing-library/react';
import { bra } from '../../../testing/fixtures/countries';
import { renderWithRouter } from '../../../testing/utils/react';
import CountryCard from './CountryCard';

describe('CountryCard', () => {
  afterEach(cleanup);

  it('renders the flag', () => {
    const root = renderWithRouter(<CountryCard country={bra} />);

    const imgEl = root.getByRole('img');
    expect(imgEl).toHaveAttribute('src', bra.flag.url);
    expect(imgEl).toHaveAttribute('alt', `${bra.name}'s flag`);
  });

  it('displays the name', () => {
    const root = renderWithRouter(<CountryCard country={bra} />);

    root.getByText(bra.name);
  });

  it('displays the capital name, if available', () => {
    const root = renderWithRouter(<CountryCard country={bra} />);

    root.getByText(`Capital: ${bra.capital}`);
  });

  it('displays a placeholder if the capital name is not available', () => {
    const root = renderWithRouter(<CountryCard country={{ ...bra, capital: null }} />);

    root.getByText('Capital: N/A');
  });

  it('displays a link to the details page', () => {
    const root = renderWithRouter(<CountryCard country={bra} />);

    const anchorEl = root.getByRole('link');
    expect(anchorEl).toHaveAttribute('href', `/country/${bra.id}`);
  });
});
