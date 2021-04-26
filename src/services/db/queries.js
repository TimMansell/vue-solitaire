import { gql } from 'apollo-boost';
import apollo from './apollo';
import { formatError, formatResponse } from './helpers';

export const getStatsCount = async (uid) => {
  try {
    const {
      data: { userStats, globalStats },
    } = await apollo.query({
      query: gql`
        query GetStats($uid: String!) {
          userStats(uid: $uid) {
            completed
          }
          globalStats {
            completed
            players
          }
        }
      `,
      variables: {
        uid,
      },
      fetchPolicy: 'no-cache',
    });

    return formatResponse({ userStats, globalStats });
  } catch (error) {
    return formatError();
  }
};

export const getUserStats = async (uid) => {
  try {
    const {
      data: { userStats },
    } = await apollo.query({
      query: gql`
        query GetUserStats($uid: String!) {
          userStats(uid: $uid) {
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
  } catch (error) {
    return formatError();
  }
};

export const getGlobalStats = async () => {
  try {
    const {
      data: { globalStats },
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
  } catch (error) {
    return formatError();
  }
};
