import { gql } from 'apollo-boost';
import { grabQuery, grabVariables } from '../helpers';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

const event = {
  path: '/graphql',
  httpMethod: 'POST',
  queryStringParameters: {},
  headers: {},
  body: `{"operationName":"GetUserStats","variables":{"uid":"${mockUid}"},"query":"query GetUserStats($uid: String!) {\\n  userStats(uid: $uid) {\\n    won\\n    lost\\n    completed\\n    __typename\\n  }\\n}\\n"}`,
  isBase64Encoded: false,
};

describe('Graphql helpers', () => {
  it('grabQuery', () => {
    const toCompare = gql`
      query GetUserStats($uid: String!) {
        userStats(uid: $uid) {
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
    const toCompare = { uid: mockUid };

    const result = grabVariables(event);

    expect(result).toEqual(toCompare);
  });
});
