import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { AppBar, Toolbar, Box, Button, Container, Typography } from '@material-ui/core';
import { Anchor } from '../../components';
import CountryDetails from './CountryDetails';
import EditCountryForm from './EditCountryForm';

export const GET_COUNTRY = gql`
  query GetCountry($id: String!) {
    countries: Country(_id: $id) {
      id: _id
      code: alpha3Code
      name
      capital
      population
      area
      topLevelDomains {
        name
      }
      flag {
        url: svgFile
      }
    }
  }
`;

function Message({ text }) {
  return (
    <Box marginTop={10}>
      <Typography component='p' variant='h1' align='center'>
        {text}
      </Typography>
    </Box>
  );
}

function EditSection({ editing, country, onClickEdit, onSubmit, onCancel }) {
  return (
    <Box marginTop={4}>
      {!editing ? (
        <Box display='flex' justifyContent='flex-end'>
          <Button variant='contained' color='secondary' onClick={onClickEdit}>
            Edit
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant='h3'>
            Editing country {country.code}
          </Typography>
          <EditCountryForm country={country} onSubmit={onSubmit} onCancel={onCancel} />
        </Box>
      )}
    </Box>
  );
}

export default function Details({ match: { params } }) {
  const { data = {}, loading, error } = useQuery(GET_COUNTRY, {
    variables: { id: params.id }
  });
  const [country] = data.countries || [];
  const [isEditingCountry, setIsEditingCountry] = useState(false);

  function toggleIsEditingCountry() {
    setIsEditingCountry(!isEditingCountry);
  }

  function handleEditSubmit(data) {
    // TODO
  }

  return (
    <>
      <AppBar color='default'>
        <Container>
          <Toolbar>
            <Anchor to='/'>
              All countries
            </Anchor>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />

      <Container>
        <Box display='flex' justifyContent='center' flexWrap='wrap'>
          {loading ? (
            <Message text='Loading...' />
          ) : error ? (
            <Message text='Failed to load.' />
          ) : (
            <Box width='100%' maxWidth='680px' marginTop={4}>
              <CountryDetails country={country} />

              <EditSection
                editing={isEditingCountry}
                country={country}
                onSubmit={handleEditSubmit}
                onCancel={toggleIsEditingCountry}
                onClickEdit={toggleIsEditingCountry}
              />
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}
