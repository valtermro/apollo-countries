import { MockedProvider } from '@apollo/client/testing';
import { act, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { bra } from '../../../testing/fixtures/countries';
import { createQueryMock } from '../../../testing/mocking/apollo';
import { renderWithRouter, waitLoad } from '../../../testing/utils/react';
import DetailsPage from './DetailsPage';

function createMock({ isLoadingCountries = false }) {
  const queryMocks = createQueryMock({ isLoadingCountries, country: bra });

  return () => (
    <MockedProvider resolvers={queryMocks.resolvers} mocks={queryMocks.mocks}>
      <DetailsPage match={{ params: { id: bra.id } }} />
    </MockedProvider>
  );
}

describe('Details page', () => {
  const loadingText = 'Loading...';

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

  it('renders a link to the dashboard', async () => {
    const Mocked = createMock({});
    const root = renderWithRouter(<Mocked />);

    await act(async () => await waitLoad());

    const linkEl = root.getByRole('link');
    expect(linkEl).toHaveAttribute('href', '/');
  });

  it('renders the country details', async () => {
    const Mocked = createMock({});
    const root = renderWithRouter(<Mocked />);

    await act(async () => await waitLoad());

    root.getByText(`Name: ${bra.name}`);
  });

  it('renders the edit button', async () => {
    const Mocked = createMock({});
    const root = renderWithRouter(<Mocked />);

    await act(async () => await waitLoad());

    root.getByRole('button', { name: /edit/i });
  });

  it('does not render the edit form by default', async () => {
    const Mocked = createMock({});
    const root = renderWithRouter(<Mocked />);

    await act(async () => await waitLoad());

    expect(root.queryByRole('form')).toBeNull();
  });

  it('renders the edit form when the edit button is clicked', async () => {
    const Mocked = createMock({});
    const root = renderWithRouter(<Mocked />);

    await act(async () => await waitLoad());
    userEvent.click(root.queryByRole('button'));
    await act(async () => await waitLoad());

    root.getByRole('form');
  });

  it('hides the edit button while editing the country', async () => {
    const Mocked = createMock({});
    const root = renderWithRouter(<Mocked />);

    await act(async () => await waitLoad());
    userEvent.click(root.queryByRole('button'));
    await act(async () => await waitLoad());

    const editEl = root.queryByRole('button', { name: /edit/i });
    expect(editEl).toBeNull();
  });

  it('closes the edit form when it is submitted', async () => {
    const Mocked = createMock({});
    const root = renderWithRouter(<Mocked />);

    await act(async () => await waitLoad());
    userEvent.click(root.queryByRole('button'));
    await act(async () => await waitLoad());
    fireEvent.submit(root.queryByRole('form'));

    root.getByRole('button', { name: /edit/i });
    expect(root.queryByRole('form')).toBeNull();
  });

  // TODO: é um teste importante mas precisa de uma estrutura de mock mais adequada
  // it('updates the country data when the edit form is submitted', async () => {
  //   const Mocked = createMock({});
  //   const root = renderWithRouter(<Mocked />);

  //   await act(async () => await waitLoad());
  //   userEvent.click(root.queryByRole('button'));
  //   await act(async () => await waitLoad());

  //   const formEl = root.queryByRole('form');
  //   const flagUrlInput = root.getByRole('textbox', { name: /flag url/i });
  //   const nameInput = root.getByRole('textbox', { name: /name/i });
  //   const capitalInput = root.getByRole('textbox', { name: /capital/i });
  //   const areaInput = root.getByRole('textbox', { name: /area/i });
  //   const populationInput = root.getByRole('textbox', { name: /population/i });
  //   const tldsInput = root.getByRole('textbox', { name: /tlds/i });

  //   clearAndType(flagUrlInput, '/1.svg');
  //   clearAndType(nameInput, 'New Country Name');
  //   clearAndType(capitalInput, 'New Capital Name');
  //   clearAndType(areaInput, '42');
  //   clearAndType(populationInput, '43');
  //   clearAndType(tldsInput, '.nt,nt1');
  //   fireEvent.submit(formEl);

  //   root.getByText('Name: New Country Name');
  //   root.getByText('Capital: New Capital Name');
  //   root.getByText('Area: 42 km²');
  //   root.getByText('Population: 43');
  //   root.getByText('TLDs: .nt, .nt1');
  // });
});
