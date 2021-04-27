const query = () => ({
  data: {
    findUserByLID: 1,
    userStats: 1,
    globalStats: 1,
  },
});

const mutate = () => ({
  data: {
    createUser: 1,
    newGame: 1,
    wonGame: 1,
    lostGame: 1,
    quitGame: 1,
  },
});

export default {
  query,
  mutate,
};
