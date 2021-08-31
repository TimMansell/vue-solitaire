export const saveGameQuery = ({ won, lost }) => {
  if (won) {
    return 'wonGame';
  }

  if (lost) {
    return 'lostGame';
  }

  return 'quitGame';
};

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
