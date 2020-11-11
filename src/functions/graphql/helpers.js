import { gql } from 'apollo-boost';

// eslint-disable-next-line import/prefer-default-export
export const grabQuery = ({ body }) => {
  const { query } = JSON.parse(body);

  const gqlQuery = gql`
    ${query}
  `;

  return gqlQuery;
};
