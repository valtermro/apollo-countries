import { GraphQLError } from 'graphql';
import { MockedProvider } from '@apollo/client/testing';
import { act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createQueryMock } from '../../../testing/mocking/apollo';
import { are, bra, brb, usa } from '../../../testing/fixtures/countries';
import { renderWithRouter, waitLoad } from '../../../testing/utils/react';
import { GET_COUNTRIES } from '../../graphql/queries';
import Dashboard from './Dashboard';

function createMock({ networkError, graphQlErrors, isLoadingCountries = false }) {
  const queryMocks = createQueryMock({ isLoadingCountries });

  const mocks = [
    mockWithFilter('none', ''),
    mockWithFilter('code', 'BR'),
    mockWithFilter('name', 'Unite'),
    ...queryMocks.mocks
  ];

  return () => (
    <MockedProvider resolvers={queryMocks.resolvers} mocks={mocks}>
      <Dashboard />
    </MockedProvider>
  );

  function mockWithFilter(searchField, search) {
    return {
      request: {
        query: GET_COUNTRIES,
        variables: { search: search }
      },
      result: {
        data: {
          countries: [bra, brb, usa, are].filter(p => {
            switch (searchField) {
              case 'code': return p.code.includes(search);
              case 'name': return p.name.includes(search);
              case 'none': return true;
              default: return false;
            }
          })
        },
        errors: graphQlErrors
      },
      error: networkError
    };
  };

}

describe('Dashboard', () => {
  const loadingText = 'Loading...';
  const loadErrorText = 'Failed to load.';

  afterEach(cleanup);

  it('handles the "loading app state" state', async () => {
    const Mocked = createMock({ isLoadingCountries: true });
    const root = renderWithRouter(<Mocked />);

    await act(async () => await waitLoad());

    root.getByText(loadingText);
  });

  it('handles the "loading data" state', () => {
    const Mocked = createMock({});
    const root = renderWithRouter(<Mocked />);

    root.getByText(loadingText);
  });

  it('handles network errors', async () => {
    const Mocked = createMock({ networkError: new Error('Network error') });
    const root = renderWithRouter(<Mocked />);

    await act(async () => await waitLoad());

    root.getByText(loadErrorText);
  });

  it('handles graphql errors', async () => {
    const Mocked = createMock({ graphQlErrors: [new GraphQLError()] });
    const root = renderWithRouter(<Mocked />);

    await act(async () => await waitLoad());

    root.getByText(loadErrorText);
  });

  it('renders the country list when the query succeeds', async () => {
    const Mocked = createMock({});
    const root = renderWithRouter(<Mocked />);

    await act(async () => await waitLoad());

    root.getByText(bra.name);
    root.getByText(brb.name);
    root.getByText(usa.name);
    root.getByText(are.name);
    expect(root.queryByText(loadingText)).not.toBeInTheDocument();
    expect(root.queryByText(loadErrorText)).not.toBeInTheDocument();
  });

  it('renders the search form', async () => {
    const Mocked = createMock({});
    const root = renderWithRouter(<Mocked />);

    await act(async () => await waitLoad());

    root.getByRole('search');
  });

  it('searches countries by code', async () => {
    const Mocked = createMock({});
    const root = renderWithRouter(<Mocked />);

    userEvent.type(root.queryByRole('searchbox'), 'BR{enter}');
    await act(async () => await waitLoad());

    root.getByText(bra.name);
    root.getByText(brb.name);
    expect(root.queryByText(usa.name)).toBeNull();
    expect(root.queryByText(are.name)).toBeNull();
  });

  it('searches countries by name', async () => {
    const Mocked = createMock({});
    const root = renderWithRouter(<Mocked />);

    userEvent.type(root.queryByRole('searchbox'), 'Unite{enter}');
    await act(async () => await waitLoad());

    root.getByText(usa.name);
    root.getByText(are.name);
    expect(root.queryByText(bra.name)).toBeNull();
  });
});
