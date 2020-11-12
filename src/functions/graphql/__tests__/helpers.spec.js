import { gql } from 'apollo-boost';
import { grabQuery } from '../helpers';

describe('Graphql helpers', () => {
  it('grabQuery', () => {
    const event = {
      path: '/graphql',
      httpMethod: 'POST',
      queryStringParameters: {},
      headers: {},
      body:
        '{"operationName":"GetUserStats","variables":{"uid":"1"},"query":"query GetUserStats($uid: String!) {\\n  userStats(uid: $uid) {\\n    count\\n    won\\n    lost\\n    completed\\n    __typename\\n  }\\n}\\n"}',
      isBase64Encoded: false,
    };

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
});
