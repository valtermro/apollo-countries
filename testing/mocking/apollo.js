import { GET_APP_STATE, GET_COUNTRY } from '../../src/graphql/queries';
import { bra } from '../fixtures/countries';

export function createQueryMock({ isLoadingCountries = false, country = bra }) {
  const appState = { isLoadingCountries };

  const mocks = [
    {
      request: {
        query: GET_APP_STATE
      },
      result: {
        data: { appState }
      }
    },
    {
      request: {
        query: GET_COUNTRY,
        variables: { id: '1' }
      },
      result: {
        data: { country }
      }
    }
  ];

  const resolvers = {
    Query: {
      country: () => country,
      appState: () => appState
    }
  };

  return { mocks, resolvers };
};
