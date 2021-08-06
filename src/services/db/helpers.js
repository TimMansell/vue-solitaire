import { format, parseISO } from 'date-fns';

export const formatResponse = ({ data }) => ({
  error: false,
  response: { ...data },
});

export const formatError = () => ({
  error: true,
});

export const formatLeaderboard = ({ data }) => {
  const [[, values]] = Object.entries(data.leaderboards);

  const leaderboards = {
    leaderboards: values.map((item, index) => {
      const { date } = item;

      return {
        rank: index + 1,
        ...item,
        date: format(parseISO(date), 'dd-MM-yyyy'),
      };
    }),
  };

  return leaderboards;
};
