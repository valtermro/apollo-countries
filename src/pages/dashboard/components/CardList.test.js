import { within, cleanup } from '@testing-library/react';
import { renderWithRouter } from '../../../../testing/utils/react';
import { bra, usa } from '../../../../testing/fixtures/countries';
import CardList from './CardList';

describe('Country CardList', () => {
  afterEach(cleanup);

  it('renders an empty component when there a no countries', () => {
    const countries = [];
    const root = renderWithRouter(<CardList countries={countries} />);

    root.getByText('Nothing here.');
  });

  it('renders the card list where there are countries', () => {
    const countries = [bra, usa];
    const root = renderWithRouter(<CardList countries={countries} />);

    root.getByRole('list');
    const listItems = root.queryAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    within(listItems[0]).getByText(bra.name);
    within(listItems[1]).getByText(usa.name);
  });
});
