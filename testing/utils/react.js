import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export function waitLoad() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

export function renderWithRouter(component) {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
}

export function clearAndTypeIn(el, value) {
  userEvent.clear(el);
  userEvent.type(el, value);
}
