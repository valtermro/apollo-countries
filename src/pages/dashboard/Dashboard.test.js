import { MemoryRouter } from 'react-router';
import { GraphQLError } from 'graphql';
import { MockedProvider } from '@apollo/client/testing';
import { render as _render, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard, { GET_COUNTRIES } from './Dashboard';

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

function createMock({ networkError, graphQlErrors }) {
  const bra = { id: '1', code: 'BRA', name: 'Brazil', capital: '', flag: { url: '/1.svg' } };
  const arg = { id: '2', code: 'ARG', name: 'Argentina', capital: '', flag: { url: '/2.svg' } };

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
  ];

  return () => (
    <MockedProvider mocks={mocks}>
      <Dashboard />
    </MockedProvider>
  );
}

describe('Dashboard', () => {
  const loadingText = 'Loading...';
  const loadErrorText = 'Failed to load.';

  afterEach(cleanup);

  it('handles the loading state', () => {
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
