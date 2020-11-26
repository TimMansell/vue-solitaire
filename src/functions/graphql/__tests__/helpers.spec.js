import { gql } from 'apollo-boost';
import { grabQuery, grabVariables } from '../helpers';

const event = {
  path: '/graphql',
  httpMethod: 'POST',
  queryStringParameters: {},
  headers: {},
  body:
    '{"operationName":"GetUserStats","variables":{"uid":"1"},"query":"query GetUserStats($uid: String!) {\\n  userStats(uid: $uid) {\\n    count\\n    won\\n    lost\\n    completed\\n    __typename\\n  }\\n}\\n"}',
  isBase64Encoded: false,
};

describe('Graphql helpers', () => {
  it('grabQuery', () => {
    const toCompare = gql`
      query GetUserStats($uid: String!) {
        userStats(uid: $uid) {
          count
          won
          lost
          completed
          __typename
        }
      }
    `;

    const result = grabQuery(event);

    expect(result).toEqual(toCompare);
  });

  it('grabVariables', () => {
    const toCompare = { uid: '1' };

    const result = grabVariables(event);

    expect(result).toEqual(toCompare);
  });
});
