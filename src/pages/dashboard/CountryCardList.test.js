import { render, within, cleanup } from '@testing-library/react';
import CountryCardList from './CountryCardList';

describe('CountryCardList', () => {
  afterEach(cleanup);

  it('renders an empty component when there a no countries', () => {
    const countries = [];
    const root = render(<CountryCardList countries={countries} />);

    root.getByText('Nothing here.');
  });

  it('renders the card list where there are countries', () => {
    const countries = [
      { code: 'CD1', name: 'Country 1', flag: { url: '/' } },
      { code: 'CD2', name: 'Country 2', flag: { url: '/' } }
    ];
    const root = render(<CountryCardList countries={countries} />);

    root.queryByRole('list');
    const listItems = root.queryAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    within(listItems[0]).getByText('Country 1');
    within(listItems[1]).getByText('Country 2');
  });
});
