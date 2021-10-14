import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const grabQuery = ({ body }) => {
  const { query } = JSON.parse(body);

  const gqlQuery = gql`
    ${query}
  `;

  return gqlQuery;
};

export const grabVariables = ({ body }) => {
  const { variables } = JSON.parse(body);

  return variables;
};
