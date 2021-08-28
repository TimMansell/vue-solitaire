import { gql } from 'apollo-boost';
import apollo from './apollo';
import { formatError, formatResponse } from './helpers';

export const getUserByID = async (uid) => {
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

    return formatResponse(response.data.user);
  } catch (error) {
    return formatError();
  }
};

export const getStatsticsCount = async (uid) => {
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

    return formatResponse(response.data);
  } catch (error) {
    return formatError();
  }
};

export const getStatistics = async (uid) => {
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

    return formatResponse(response.data);
  } catch (error) {
    return formatError();
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

    return formatResponse(response.data.version.number);
  } catch (error) {
    return formatError();
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

    return formatResponse(response.data.user.history);
  } catch (error) {
    return formatError();
  }
};

export const getLeaderboards = async ({ limit, showBest }) => {
  const QUERY_STRING = {
    Moves: 'moves',
    Times: 'times',
  };

  const QUERIES = {
    Moves: `${QUERY_STRING.Moves} {
      rank
      date
      player
      moves
    }`,
    Times: `${QUERY_STRING.Times} {
      rank
      date
      player
      duration
    }`,
  };

  const query = QUERIES[showBest];

  try {
    const response = await apollo.query({
      query: gql`
        query Leaderboards($offset: Int!, $limit: Int!) {
          leaderboards(offset: $offset, limit: $limit) {
            ${query}
          }
        }
      `,
      variables: { limit, offset: 0 },
      fetchPolicy: 'no-cache',
    });

    return formatResponse(response.data.leaderboards[QUERY_STRING[showBest]]);
  } catch (error) {
    return formatError();
  }
};
