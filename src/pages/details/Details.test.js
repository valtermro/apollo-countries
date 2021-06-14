import { GraphQLError } from 'graphql';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/client/testing';
import { render as _render, act, cleanup } from '@testing-library/react';
import Details, { GET_COUNTRY } from './Details';

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
  const mocks = [
    {
      request: {
        query: GET_COUNTRY,
        variables: { id: '1' }
      },
      result: {
        data: {
          countries: [
            {
              id: '1',
              code: 'CA1',
              name: 'Country 1',
              capital: 'Capital 1',
              population: 42000,
              area: 42000000,
              topLevelDomains: [{ name: '.ca' }],
              flag: { url: '/1.svg' }
            }
          ]
        },
        errors: graphQlErrors
      },
      error: networkError
    }
  ];

  return () => (
    <MockedProvider mocks={mocks}>
      <Details match={{ params: { id: '1' } }} />
    </MockedProvider>
  );
}

describe('Details page', () => {
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

  it('renders a link to the dashboard', async () => {
    const Mocked = createMock({});
    const root = render(<Mocked />);

    await act(async () => await waitLoad());

    const linkEl = root.getByRole('link');
    expect(linkEl).toHaveAttribute('href', '/');
  });

  it('renders the country details', async () => {
    const Mocked = createMock({});
    const root = render(<Mocked />);

    await act(async () => await waitLoad());

    root.getByText('Name: Country 1');
  });
});
