import { useState } from 'react';
import { Box } from '@material-ui/core';
import { Form, TextInput, SubmitButton, CancelButton } from '../../components/form';

function countryToValues(country) {
  return {
    flagUrl: country.flag.url,
    name: country.name,
    capital: country.capital,
    area: country.area,
    population: country.population,
    tlds: country.topLevelDomains.map(p => p.name).join(',')
  };
}

function validate(data) {
  const errors = {};

  for (const [key, value] of Object.entries(data)) {
    if (!value)
      errors[key] = 'Required';
  }
  return Object.keys(errors).length > 0 ? errors: null;
}

export default function EditCountryForm({ country, onSubmit, onCancel }) {
  const [values, setValues] = useState(countryToValues(country));
  const [errors, setErrors] = useState({});

  function handleSubmit() {
    const validationErrors = validate(values);
    setErrors(validationErrors || {});
    if (validationErrors) return;

    const data = {
      id: country.id,
      ...values,
      area: parseFloat(values.area),
      population: parseFloat(values.population),
      tlds: values.tlds.split(',').map(tld => tld.trim())
    };
    onSubmit(data);
  }

  function handleCancel() {
    setValues(countryToValues(country));
    onCancel();
  }

  function set(field) {
    return value => setValues({ ...values, [field]: value });
  }

  return (
    <Form name='Edit country' onSubmit={handleSubmit}>
      <TextInput
        label='Flag url'
        value={values.flagUrl}
        error={errors.flagUrl}
        onValueChange={set('flagUrl')}
      />
      <TextInput
        label='Name'
        value={values.name}
        error={errors.name}
        onValueChange={set('name')}
      />
      <TextInput
        label='Capital'
        value={values.capital}
        error={errors.capital}
        onValueChange={set('capital')}
      />
      <TextInput
        label='Area'
        value={values.area}
        error={errors.area}
        onValueChange={set('area')}
      />
      <TextInput
        label='Population'
        value={values.population}
        error={errors.population}
        onValueChange={set('population')}
      />
      <TextInput
        label='TLDs'
        value={values.tlds}
        error={errors.tlds}
        onValueChange={set('tlds')}
      />

      <Box textAlign='right' marginTop={2}>
        <SubmitButton>
          Save
        </SubmitButton>
        <CancelButton onClick={handleCancel}>
          Cancel
        </CancelButton>
      </Box>
    </Form>
  );
}
