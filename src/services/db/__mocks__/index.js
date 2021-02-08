const userStats = { count: 1 };
const globalStats = { count: 1 };
const findUserByLID = { uid: 123 };
const mockID = { _id: 123 };

const getAUser = () => ({
  response: { findUserByLID },
});

const getStatsCount = () => ({
  response: { userStats, globalStats },
});

const getGlobalStats = () => ({
  response: { globalStats },
});

const getUserStats = () => ({
  response: { userStats },
});

const newUser = () => ({
  error: false,
  response: { createUser: mockID },
});

const gameNew = () => ({
  response: { newGame: mockID },
});

const gameWon = () => ({
  response: { wonGame: mockID },
});

const gameLost = () => ({
  response: { lostGame: mockID },
});

const gameAbandoned = () => ({
  response: { completedGame: mockID },
});

const db = () => ({
  getAUser,
  getUserStats,
  getGlobalStats,
  getStatsCount,
  newUser,
  gameNew,
  gameWon,
  gameLost,
  gameAbandoned,
});

export default db();
