import { gql } from '@apollo/client';

export const GET_APP_STATE = gql`
  query GetAppState {
    appState @client {
      isLoadingCountries
    }
  }
`;

export const GET_COUNTRIES = gql`
  query GetCountries($search: String = "") {
    countries: Country(
      filter: { OR: [{ name_contains: $search }, { alpha3Code_contains: $search }]
    }) {
      id: _id
      code: alpha3Code
      name
      capital
      area
      population
      topLevelDomains {
        name
      }
      flag {
        url: svgFile
      }
    }
  }
`;

export const GET_COUNTRY = gql`
  query GetCountryDetails($id: String!) {
    country(id: $id) @client {
      id: _id
      code: alpha3Code
      name
      capital
      area
      population
      topLevelDomains {
        name
      }
      flag {
        url: svgFile
      }
    }
  }
`;
