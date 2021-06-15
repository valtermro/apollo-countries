import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/client/testing';
import { render as _render, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Details from './Details';
import { GET_APP_STATE, GET_COUNTRY } from '../../graphql/queries';

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

function createMock({ appState = { isLoadingCountries: false } }) {
  const country = {
    id: '1',
    code: 'CA1',
    name: 'Country 1',
    capital: 'Capital 1',
    area: 42000000,
    population: 42000,
    topLevelDomains: [{ name: '.ca' }],
    flag: { url: '/1.svg' }
  };

  const resolvers = {
    Query: {
      country: () => country,
      appState: () => appState
    }
  };

  const mocks = [
    {
      request: {
        query: GET_COUNTRY,
        variables: { id: '1' }
      },
      result: {
        data: { country }
      }
    },
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
      <Details match={{ params: { id: '1' } }} />
    </MockedProvider>
  );
}

describe('Details page', () => {
  const loadingText = 'Loading...';

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

  it('renders the edit button', async () => {
    const Mocked = createMock({});
    const root = render(<Mocked />);

    await act(async () => await waitLoad());

    root.getByRole('button', { name: /edit/i });
  });

  it('does not render the edit form by default', async () => {
    const Mocked = createMock({});
    const root = render(<Mocked />);

    await act(async () => await waitLoad());

    expect(root.queryByRole('form')).toBeNull();
  });

  it('renders the edit form when the edit button is clicked', async () => {
    const Mocked = createMock({});
    const root = render(<Mocked />);

    await act(async () => await waitLoad());
    userEvent.click(root.queryByRole('button'));
    await act(async () => await waitLoad());

    root.getByRole('form');
  });

  it('hides the edit button while editing the country', async () => {
    const Mocked = createMock({});
    const root = render(<Mocked />);

    await act(async () => await waitLoad());
    userEvent.click(root.queryByRole('button'));
    await act(async () => await waitLoad());

    const editEl = root.queryByRole('button', { name: /edit/i });
    expect(editEl).toBeNull();
  });
});
