import { gql } from 'apollo-boost';
import apollo from './apollo';
import { formatError, formatResponse, formatData } from './helpers';

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

    return formatResponse(response);
  } catch (error) {
    return formatError();
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

    return formatResponse(response);
  } catch (error) {
    return formatError();
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

    return formatResponse(response);
  } catch (error) {
    return formatError();
  }
};

export const getAppVersion = async () => {
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

    return formatResponse(response);
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

    return formatResponse(response);
  } catch (error) {
    return formatError();
  }
};

export const getLeaderboards = async ({ limit, showBest }) => {
  const QUERIES = {
    Moves: `moves {
      rank
      date
      player
      moves
    }`,
    Times: `times {
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

    const data = formatData(response);

    return formatResponse({ data });
  } catch (error) {
    return formatError();
  }
};
