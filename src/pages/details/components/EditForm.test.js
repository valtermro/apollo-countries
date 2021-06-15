import { render, fireEvent, cleanup } from '@testing-library/react';
import { bra } from '../../../../testing/fixtures/countries';
import { clearAndTypeIn } from '../../../../testing/utils/react';
import EditForm from './EditForm';

function getInputs(root) {
  return {
    flagUrl: root.getByRole('textbox', { name: /flag url/i }),
    name: root.getByRole('textbox', { name: /name/i }),
    capital: root.getByRole('textbox', { name: /capital/i }),
    area: root.getByRole('textbox', { name: /area/i }),
    population: root.getByRole('textbox', { name: /population/i }),
    tlds: root.getByRole('textbox', { name: /tlds/i })
  };
}

function typeInputValues(inputs, values) {
  clearAndTypeIn(inputs.flagUrl, values.flagUrl);
  clearAndTypeIn(inputs.name, values.name);
  clearAndTypeIn(inputs.capital, values.capital);
  clearAndTypeIn(inputs.area, values.area);
  clearAndTypeIn(inputs.population, values.population);
  clearAndTypeIn(inputs.tlds, values.tlds);
}

function countryToInputValues(country) {
  return {
    flagUrl: country.flag.url,
    name: country.name,
    capital: country.capital,
    area: String(country.area),
    population: String(country.population),
    tlds: country.topLevelDomains.map(p => p.name).join(',')
  };
}

describe('Edit country form', () => {
  beforeEach(cleanup);

  it('renders the form', () => {
    const root = render(<EditForm country={bra} />);

    root.getByRole('form', { name: /edit country/i });
    root.getByRole('button', { name: /save/i });
    root.getByRole('button', { name: /cancel/i });
    getInputs(root);
  });

  it('Initializes all fields with the current values', () => {
    const root = render(<EditForm country={bra} />);
    const inputs = getInputs(root);
    const values = countryToInputValues(bra);

    for (const [key, input] of Object.entries(inputs))
      expect(input).toHaveValue(values[key]);
  });

  it('submits with the new values', () => {
    const onSubmit = jest.fn();
    const root = render(<EditForm country={bra} onSubmit={onSubmit} />);
    const newValues = {
      flagUrl: '/new-flag-url.svg',
      name: 'New Name',
      capital: 'New Capital',
      population: String(bra.population * 2),
      area: String(bra.area * 2),
      tlds: '.ntld1 ,.ntld2, .ntld3'
    };

    const inputs = getInputs(root);
    typeInputValues(inputs, newValues);
    fireEvent.submit(root.queryByRole('form'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      id: bra.id,
      ...newValues,
      population: parseFloat(newValues.population),
      area: parseFloat(newValues.area),
      tlds: newValues.tlds.split(',').map(tld => tld.trim())
    });
  });

  it('dispatches the cancel event', () => {
    const onCancel = jest.fn();
    const root = render(<EditForm country={bra} onCancel={onCancel} />);

    fireEvent.click(root.getByRole('button', { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledWith();
  });

  it('resets the input values when editing is canceled', () => {
    const onCancel = () => { };
    const root = render(<EditForm country={bra} onCancel={onCancel} />);
    const oldValues = countryToInputValues(bra);
    const newValues = {
      flagUrl: '/new-flag-url.svg',
      name: 'New Name',
      capital: 'New Capital',
      population: String(bra.population * 2),
      area: String(bra.area * 2),
      tlds: '.ntld1 ,.ntld2, .ntld3'
    };

    const inputs = getInputs(root);
    typeInputValues(inputs, newValues);
    fireEvent.click(root.getByRole('button', { name: /cancel/i }));

    for (const key of Object.keys(inputs))
      expect(inputs[key]).toHaveValue(oldValues[key]);
  });

  it('validates itself', () => {
    const validData = countryToInputValues(bra);
    const fieldInfo = Object.keys(validData).map(key => ({
      key,
      invalid: '',
      message: 'Required'
    }));

    const onSubmit = jest.fn();
    const root = render(<EditForm country={bra} onSubmit={onSubmit} />);
    const formEl = root.queryByRole('form');
    const inputs = getInputs(root);

    for (const info of fieldInfo) {
      typeInputValues(inputs, { ...validData, [info.key]: info.invalid });
      fireEvent.submit(formEl);
      root.getByText(info.message);
      expect(onSubmit).not.toHaveBeenCalled();
    }
  });

  it('resets validation on submit', () => {
    const validData = countryToInputValues(bra);
    const fieldInfo = Object.entries(validData).map(([key, value]) => ({
      key,
      valid: String(value),
      invalid: '',
      message: 'Required'
    }));

    const onSubmit = jest.fn();
    const root = render(<EditForm country={bra} onSubmit={onSubmit} />);
    const formEl = root.queryByRole('form');
    const inputs = getInputs(root);
    let validCallCount = 0;

    for (const info of fieldInfo) {
      typeInputValues(inputs, { ...validData, [info.key]: info.invalid });
      fireEvent.submit(formEl);

      typeInputValues(inputs, { ...validData, [info.key]: info.valid });
      fireEvent.submit(formEl);
      expect(root.queryByText(info.message)).toBeNull();
      expect(onSubmit).toHaveBeenCalledTimes(++validCallCount);
    }
  });
});
