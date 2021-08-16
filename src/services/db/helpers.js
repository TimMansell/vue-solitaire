export const formatResponse = ({ data }) => ({
  error: false,
  response: { ...data },
});

export const formatError = () => ({
  error: true,
});

export const formatData = ({ data }) => {
  const [[, leaderboards]] = Object.entries(data.leaderboards);

  const leaderboardsArray = {
    leaderboards,
  };

  return leaderboardsArray;
};
