import { render, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditCountryForm from './EditCountryForm';

describe('EditCountryForm', () => {
  const country = {
    id: '1',
    code: 'CD1',
    name: 'Country 1',
    capital: 'Capital 1',
    area: 42000,
    population: 42000000,
    flag: { url: 'flag1.svg' },
    topLevelDomains: [{ name: '.ct' }, { name: '.ct.br' }]
  };

  function clearAndType(el, value) {
    userEvent.clear(el);
    userEvent.type(el, value);
  }

  function typeInputValues(inputs, values) {
    clearAndType(inputs.flagUrl, values.flagUrl);
    clearAndType(inputs.name, values.name);
    clearAndType(inputs.capital, values.capital);
    clearAndType(inputs.area, values.area);
    clearAndType(inputs.population, values.population);
    clearAndType(inputs.tlds, values.tlds);
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

  beforeEach(cleanup);

  it('renders the form', () => {
    const root = render(<EditCountryForm country={country} />);

    root.getByRole('form', { name: /edit country/i });
    root.getByRole('button', { name: /save/i });
    root.getByRole('button', { name: /cancel/i });
    getInputs(root);
  });

  it('Initializes all fields with the current values', () => {
    const root = render(<EditCountryForm country={country} />);
    const inputs = getInputs(root);
    const values = countryToInputValues(country);

    for (const [key, input] of Object.entries(inputs))
      expect(input).toHaveValue(values[key]);
  });

  it('submits with the new values', () => {
    const onSubmit = jest.fn();
    const root = render(<EditCountryForm country={country} onSubmit={onSubmit} />);
    const newValues = {
      flagUrl: '/new-flag-url.svg',
      name: 'New Name',
      capital: 'New Capital',
      population: String(country.population * 2),
      area: String(country.area * 2),
      tlds: '.ntld1 ,.ntld2, .ntld3'
    };

    const inputs = getInputs(root);
    typeInputValues(inputs, newValues);
    fireEvent.submit(root.queryByRole('form'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      id: country.id,
      ...newValues,
      population: parseFloat(newValues.population),
      area: parseFloat(newValues.area),
      tlds: newValues.tlds.split(',').map(tld => tld.trim())
    });
  });

  it('dispatches the cancel event', () => {
    const onCancel = jest.fn();
    const root = render(<EditCountryForm country={country} onCancel={onCancel} />);

    fireEvent.click(root.getByRole('button', { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledWith();
  });

  it('resets the input values when editing is canceled', () => {
    const onCancel = () => { };
    const root = render(<EditCountryForm country={country} onCancel={onCancel} />);
    const oldValues = countryToInputValues(country);
    const newValues = {
      flagUrl: '/new-flag-url.svg',
      name: 'New Name',
      capital: 'New Capital',
      population: String(country.population * 2),
      area: String(country.area * 2),
      tlds: '.ntld1 ,.ntld2, .ntld3'
    };

    const inputs = getInputs(root);
    typeInputValues(inputs, newValues);
    fireEvent.click(root.getByRole('button', { name: /cancel/i }));

    for (const key of Object.keys(inputs))
      expect(inputs[key]).toHaveValue(oldValues[key]);
  });

  it('validates itself', () => {
    const validData = countryToInputValues(country);
    const fieldInfo = Object.keys(validData).map(key => ({
      key,
      invalid: '',
      message: 'Required'
    }));

    const onSubmit = jest.fn();
    const root = render(<EditCountryForm country={country} onSubmit={onSubmit} />);
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
    const validData = countryToInputValues(country);
    const fieldInfo = Object.entries(validData).map(([key, value]) => ({
      key,
      valid: String(value),
      invalid: '',
      message: 'Required'
    }));

    const onSubmit = jest.fn();
    const root = render(<EditCountryForm country={country} onSubmit={onSubmit} />);
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
