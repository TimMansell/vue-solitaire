import { gql } from 'apollo-boost';
import apollo from './apollo';
import { formatError, formatResponse } from './helpers';

// eslint-disable-next-line import/prefer-default-export
export const getAUser = async (uid) => {
  try {
    const { data } = await apollo.query({
      query: gql`
        query GetAUser($uid: String!) {
          getUser(uid: $uid) {
            uid
          }
        }
      `,
      variables: {
        uid,
      },
    });

    return formatResponse(data.getUser);
  } catch (error) {
    return formatError();
  }
};
