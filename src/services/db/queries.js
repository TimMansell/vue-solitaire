import { gql } from 'apollo-boost';
import apollo from './apollo';
import { formatError, formatResponse } from './helpers';

export const checkUserExists = async (uid) => {
  try {
    const response = await apollo.query({
      query: gql`
        query FindUser($uid: String!) {
          findUser(uid: $uid) {
            exists
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

export const getUserStats = async (uid) => {
  try {
    const response = await apollo.query({
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

    return formatResponse(response);
  } catch (error) {
    return formatError();
  }
};

export const getGlobalStats = async () => {
  try {
    const response = await apollo.query({
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
