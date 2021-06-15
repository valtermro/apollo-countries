import { gql } from '@apollo/client';
import { GET_COUNTRIES } from './queries';

export const typeDefs = gql`
  type CountryFlag {
    svgFile: String!
  }

  type CountryTld {
    name: String!
  }

  type CountryDetails {
    _id: String
    alpha3Code: String!
    name: String!
    capital: String!
    flag: CountryFlag
    topLevelDomains: [CountryTld!]!
  }

  type AppState {
    isLoadingCountries: Boolean!
  }

  extend type Query {
    appState: AppState!
    country(id: String!): CountryDetails
  }
`;

export const typePolicies = {
  Flag: {
    keyFields: ['svgFile']
  },
  Query: {
    fields: {
      appState(current = { isLoadingCountries: true }) {
        return current;
      },

      country(_, { args, cache }) {
        const queryResult = cache.readQuery({
          query: GET_COUNTRIES,
          variables: { search: '' }
        });
        const countries = queryResult?.countries || [];
        const country = countries.find(p => p.id === args.id);
        if (!country) return {};

        return {
          ...country,
          _id: country.id,
          alpha3Code: country.code,
          flag: { svgFile: country.flag.url },
          topLevelDomains: country.topLevelDomains || []
        };
      }
    }
  }
};
