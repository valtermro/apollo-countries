import { cleanup } from '@testing-library/react';
import { renderWithRouter } from '../../testing/utils/react';
import Anchor from './Anchor';

describe('Anchor', () => {
  afterEach(cleanup);

  it('renders a link', () => {
    const root = renderWithRouter(<Anchor to='/'>Go</Anchor>);

    root.getByRole('link', { text: 'Go' });
  });
});
