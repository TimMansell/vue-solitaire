import { gql } from 'apollo-boost';
import apollo from './apollo';
import { leaderboardsQuery } from './helpers';

export const getInitialData = async (uid, localVersion) => {
  try {
    const response = await apollo.query({
      query: gql`
        query GetInitialData($uid: String!, $localVersion: String!) {
          user(uid: $uid) {
            exists
            name
          }
          userStats(uid: $uid) {
            completed
          }
          globalStats {
            completed
            players
          }
          version(localVersion: $localVersion) {
            matches
          }
        }
      `,
      variables: {
        uid,
        localVersion,
      },
      fetchPolicy: 'no-cache',
    });

    return response.data;
  } catch (error) {
    return {
      user: {
        name: '',
        exists: false,
      },
      userStats: {},
      globalStats: {},
      version: {
        matches: true,
      },
    };
  }
};

export const getStats = async (uid) => {
  try {
    const response = await apollo.query({
      query: gql`
        query GetStats($uid: String!) {
          userStats(uid: $uid) {
            won
            lost
            completed
          }
          globalStats {
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

    return response.data;
  } catch (error) {
    return {
      userStats: {},
      globalStats: {},
    };
  }
};

export const getUsersGames = async (uid, { offset, limit }) => {
  try {
    const response = await apollo.query({
      query: gql`
        query UserHistory($uid: String!, $offset: Int!, $limit: Int!) {
          user(uid: $uid) {
            history(offset: $offset, limit: $limit) {
              number
              date
              time
              outcome
              moves
              duration
            }
          }
        }
      `,
      variables: { uid, offset, limit },
      fetchPolicy: 'no-cache',
    });

    return response.data.user;
  } catch (error) {
    return { history: [] };
  }
};

export const getLeaderboards = async ({ limit, showBest }) => {
  const { key, query } = leaderboardsQuery(showBest);

  try {
    const response = await apollo.query({
      query: gql`
        query Leaderboards($offset: Int!, $limit: Int!) {
          leaderboards(offset: $offset, limit: $limit) {
            ${key} {
              rank
              date
              player
              ${query}
            }
          }
        }
      `,
      variables: { limit, offset: 0 },
      fetchPolicy: 'no-cache',
    });

    return response.data.leaderboards[key];
  } catch (error) {
    return [];
  }
};
