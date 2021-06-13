import { render, act, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Dashboard, { GET_COUNTRIES } from './Dashboard';
import { GraphQLError } from 'graphql';

describe('Dashboard', () => {
  const countries = [
    {
      id: '1',
      code: 'BRA',
      name: 'Brazil',
      capital: 'Brasília',
      flag: { url: 'https://restcountries.eu/data/bra.svg' }
    }
  ];

  const loadingText = 'Loading...';
  const loadErrorText = /Failed to load/;

  afterEach(cleanup);

  it('handles the loading state', () => {
    const root = render(<MockedDashboard countries={countries} />);

    root.queryByText(loadingText);
  });

  it('handles network errors', async () => {
    const error = new Error('Network error');
    const root = render(<MockedDashboard networkError={error} />);

    await act(async () => await waitLoad());

    root.getByText(loadErrorText);
  });

  it('handles graphql errors', async () => {
    const errors = [new GraphQLError()];
    const root = render(<MockedDashboard graphQlErrors={errors} />);

    await act(async () => await waitLoad());

    root.getByText(loadErrorText);
  });

  it('renders the country list when the query succeeds', async () => {
    const root = render(<MockedDashboard countries={countries} />);

    await act(async () => await waitLoad());

    for (const country of countries)
      root.getByText(country.name);
    expect(root.queryByText(loadingText)).not.toBeInTheDocument();
    expect(root.queryByText(loadErrorText)).not.toBeInTheDocument();
  });
});


function waitLoad() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

function MockedDashboard({ countries, networkError, graphQlErrors }) {
  const mocks = [
    {
      request: {
        query: GET_COUNTRIES
      },
      result: {
        data: countries && { countries },
        errors: graphQlErrors
      },
      error: networkError
    }
  ];

  return (
    <MockedProvider mocks={mocks}>
      <Dashboard />
    </MockedProvider>
  );
}
