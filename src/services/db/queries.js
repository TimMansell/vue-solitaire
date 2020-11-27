import { gql } from 'apollo-boost';
import apollo from './apollo';
import { formatError, formatResponse } from './helpers';

// eslint-disable-next-line import/prefer-default-export
export const getAUser = async (uid) => {
  try {
    const {
      // data: { findUserByLID },
      data,
    } = await apollo.query({
      query: gql`
        query FindAUserByLID($uid: String!) {
          findUserByLID(uid: $uid) {
            uid
          }
        }
      `,
      variables: {
        uid,
      },
    });

    // return formatResponse({ findUserByLID });
    return formatResponse(data.findUserByLID);
  } catch (error) {
    return formatError();
  }
};

export const getStatsCount = async (uid) => {
  try {
    const {
      data: { userStats, globalStats },
      // data,
    } = await apollo.query({
      query: gql`
        query GetStats($uid: String!) {
          userStats(uid: $uid) {
            count
          }
          globalStats {
            completed
          }
        }
      `,
      variables: {
        uid,
      },
      fetchPolicy: 'no-cache',
    });

    return formatResponse({ userStats, globalStats });
    // return formatResponse(data);
  } catch (error) {
    return formatError();
  }
};

export const getUserStats = async (uid) => {
  try {
    const {
      data: { userStats },
      // data,
    } = await apollo.query({
      query: gql`
        query GetUserStats($uid: String!) {
          userStats(uid: $uid) {
            count
            won
            lost
            completed
          }
        }
      `,
      variables: {
        uid,
      },
      fetchPolicy: 'no-cache',
    });

    return formatResponse({ userStats });
    // return formatResponse(data.userStats);
  } catch (error) {
    return formatError();
  }
};

export const getGlobalStats = async () => {
  try {
    const {
      data: { globalStats },
      // data,
    } = await apollo.query({
      query: gql`
        query {
          globalStats {
            won
            lost
            completed
          }
        }
      `,
      variables: {},
      fetchPolicy: 'no-cache',
    });

    return formatResponse({ globalStats });
    // return formatResponse(data.globalStats);
  } catch (error) {
    return formatError();
  }
};
