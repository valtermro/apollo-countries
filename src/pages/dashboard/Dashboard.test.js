import { MemoryRouter } from 'react-router';
import { GraphQLError } from 'graphql';
import { MockedProvider } from '@apollo/client/testing';
import { render as _render, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from './Dashboard';
import { GET_APP_STATE, GET_COUNTRIES } from '../../graphql/queries';

function render(component) {
  return _render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
}

function waitLoad() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

function createMock({
  networkError,
  graphQlErrors,
  appState = { isLoadingCountries: false }
}) {
  const bra = {
    id: '1',
    code: 'BRA',
    name: 'Brazil',
    capital: '',
    area: 1,
    population: 1,
    topLevelDomains: [{ name: '.cc' }],
    flag: { url: '/1.svg' }
  };
  const arg = {
    id: '2',
    code: 'ARG',
    name: 'Argentina',
    capital: '',
    area: 1,
    population: 1,
    topLevelDomains: [{ name: '.cc' }],
    flag: { url: '/2.svg' }
  };

  const resolvers = {
    Query: {
      appState: () => appState
    }
  };
  const mockWithFilter = (search, countries) => {
    return {
      request: {
        query: GET_COUNTRIES,
        variables: { search: search }
      },
      result: {
        data: {
          countries: countries
        },
        errors: graphQlErrors
      },
      error: networkError
    };
  };

  const mocks = [
    mockWithFilter('', [bra, arg]),
    mockWithFilter('BR', [bra]),
    mockWithFilter('Braz', [bra]),
    mockWithFilter('AR', [arg]),
    mockWithFilter('Argen', [arg]),
    {
      request: {
        query: GET_APP_STATE
      },
      result: {
        data: { appState }
      }
    }
  ];

  return () => (
    <MockedProvider resolvers={resolvers} mocks={mocks}>
      <Dashboard />
    </MockedProvider>
  );
}

describe('Dashboard', () => {
  const loadingText = 'Loading...';
  const loadErrorText = 'Failed to load.';

  afterEach(cleanup);

  it('handles the "loading app state" state', async () => {
    const Mocked = createMock({ appState: { isLoadingCountries: true }});
    const root = render(<Mocked />);

    await act(async () => await waitLoad());

    root.getByText(loadingText);
  });

  it('handles the "loading data" state', () => {
    const Mocked = createMock({});
    const root = render(<Mocked />);

    root.getByText(loadingText);
  });

  it('handles network errors', async () => {
    const Mocked = createMock({ networkError: new Error('Network error') });
    const root = render(<Mocked />);

    await act(async () => await waitLoad());

    root.getByText(loadErrorText);
  });

  it('handles graphql errors', async () => {
    const Mocked = createMock({ graphQlErrors: [new GraphQLError()] });
    const root = render(<Mocked />);

    await act(async () => await waitLoad());

    root.getByText(loadErrorText);
  });

  it('renders the country list when the query succeeds', async () => {
    const Mocked = createMock({});
    const root = render(<Mocked />);

    await act(async () => await waitLoad());

    root.getByText('Brazil');
    root.getByText('Argentina');
    expect(root.queryByText(loadingText)).not.toBeInTheDocument();
    expect(root.queryByText(loadErrorText)).not.toBeInTheDocument();
  });

  it('renders the search form', async () => {
    const Mocked = createMock({});
    const root = render(<Mocked />);

    await act(async () => await waitLoad());

    root.getByRole('search');
  });

  it('searches countries by code', async () => {
    const Mocked = createMock({});
    const root = render(<Mocked />);

    userEvent.type(root.queryByRole('searchbox'), 'AR{enter}');
    await act(async () => await waitLoad());

    root.getByText('Argentina');
    expect(root.queryByText('Brazil')).toBeNull();
  });

  it('searches countries by name', async () => {
    const Mocked = createMock({});
    const root = render(<Mocked />);

    userEvent.type(root.queryByRole('searchbox'), 'Braz{enter}');
    await act(async () => await waitLoad());

    root.getByText('Brazil');
    expect(root.queryByText('Argentina')).toBeNull();
  });
});
