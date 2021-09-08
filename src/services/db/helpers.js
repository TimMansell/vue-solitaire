// eslint-disable-next-line import/prefer-default-export
export const leaderboardsQuery = (showBest) => {
  if (showBest === 'Times') {
    return {
      key: 'times',
      query: 'duration',
    };
  }

  return {
    key: 'moves',
    query: 'moves',
  };
};
