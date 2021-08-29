import { gql } from 'apollo-boost';
import apollo from './apollo';
import { leaderboardsQuery } from './helpers';
import { version } from '../../../package.json';

export const getUser = async (uid) => {
  try {
    const response = await apollo.query({
      query: gql`
        query User($uid: String!) {
          user(uid: $uid) {
            exists
            name
          }
        }
      `,
      variables: {
        uid,
      },
      fetchPolicy: 'no-cache',
    });

    return response.data.user;
  } catch (error) {
    return { name: '', exists: false };
  }
};

export const getStatsCount = async (uid) => {
  try {
    const response = await apollo.query({
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

    return response.data;
  } catch (error) {
    return {
      userStats: {},
      globalStats: {},
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

export const checkAppVersion = async () => {
  try {
    const response = await apollo.query({
      query: gql`
        query {
          version {
            number
          }
        }
      `,
      variables: {},
      fetchPolicy: 'no-cache',
    });

    return version === response.data.version.number;
  } catch (error) {
    return true;
  }
};

export const getUsersGames = async (uid, { offset, limit }) => {
  try {
    const response = await apollo.query({
      query: gql`
        query User($uid: String!, $offset: Int!, $limit: Int!) {
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
