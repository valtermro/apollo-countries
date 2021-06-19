import { render, within, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';

describe('Country SearchForm', () => {
  afterEach(cleanup);

  it('renders a search form', () => {
    const root = render(<SearchForm />);

    const formEl = root.getByRole('search');
    const form = within(formEl);
    form.getByRole('searchbox');
    form.getByRole('button', { name: /search/i });
  });

  it('dispatches a submit event with the search string as argument (enter key)', () => {
    const onSubmitSearch = jest.fn();
    const root = render(<SearchForm onSubmit={onSubmitSearch} />);

    const searchboxEl = root.queryByRole('searchbox');
    userEvent.type(searchboxEl, 'BRA{enter}');

    expect(onSubmitSearch).toHaveBeenCalledTimes(1);
    expect(onSubmitSearch).toHaveBeenCalledWith('BRA');
  });

  it('dispatches a submit event with the search string as argument (submit button)', () => {
    const onSubmitSearch = jest.fn();
    const root = render(<SearchForm onSubmit={onSubmitSearch} />);

    const searchboxEl = root.queryByRole('searchbox');
    const buttonEl = root.getByRole('button', { name: /search/i });
    userEvent.type(searchboxEl, 'BRA');
    userEvent.click(buttonEl);

    expect(onSubmitSearch).toHaveBeenCalledTimes(1);
    expect(onSubmitSearch).toHaveBeenCalledWith('BRA');
  });
});
