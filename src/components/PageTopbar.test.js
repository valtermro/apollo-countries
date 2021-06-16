import { render, cleanup } from '@testing-library/react';
import PageTopbar from './PageTopbar';

describe('PageTopbar', () => {
  afterEach(cleanup);

  it('renders its children', () => {
    const root = render(
      <PageTopbar>
        <div>Foo</div>
        <p>Bar</p>
      </PageTopbar>
    );

    expect(root.getByText('Foo')).toBeInstanceOf(HTMLDivElement);
    expect(root.getByText('Bar')).toBeInstanceOf(HTMLParagraphElement);
  });
});
