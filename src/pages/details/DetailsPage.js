import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { AppBar, Toolbar, Box, Container } from '@material-ui/core';
import { Anchor, PageMessage } from '../../components';
import { GET_APP_STATE, GET_COUNTRY } from '../../graphql/queries';
import DetailsPanel from './components/DetailsPanel';
import EditPanel from './components/EditPanel';

export default function DetailsPage({ match: { params } }) {
  const { data: { appState } = {}, client } = useQuery(GET_APP_STATE);
  const { data: { country } = {}, loading } = useQuery(GET_COUNTRY, {
    variables: { id: params.id }
  });
  const [isEditingCountry, setIsEditingCountry] = useState(false);

  function toggleIsEditingCountry() {
    setIsEditingCountry(!isEditingCountry);
  }

  function handleEditSubmit(data) {
    const countryData = {
      ...country,
      name: data.name,
      capital: data.capital,
      area: parseFloat(data.area),
      population: parseFloat(data.population),
      flag: { url: data.flagUrl },
      topLevelDomains: data.tlds.map(name => ({ name }))
    };

    client.writeQuery({
      query: GET_COUNTRY,
      data: { country: countryData }
    });

    toggleIsEditingCountry();
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
          {appState?.isLoadingCountries || loading ? (
            <PageMessage text='Loading...' />
          ) : (
            <Box width='100%' maxWidth='680px' marginTop={4}>
              <DetailsPanel country={country} />

              <EditPanel
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
