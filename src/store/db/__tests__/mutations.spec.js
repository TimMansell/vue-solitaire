import mutations from '../mutations';

const { RESTART_GAME, SET_USER_GAMES, SET_GAME, INCREMENT_MOVES } = mutations;

describe('DB store', () => {
  let state = {};

  beforeEach(() => {
    state = {
      userStats: {
        totalGames: 1,
      },
      game: {
        id: 1,
        moves: 0,
      },
    };
  });

  it('RESTART_GAME', () => {
    RESTART_GAME(state);

    expect(state.userStats.totalGames).toEqual(1);
    expect(state.game.id).toEqual(null);
  });

  it('SET_USER_GAMES', () => {
    SET_USER_GAMES(state, 2);

    expect(state.userStats.totalGames).toEqual(2);
  });

  it('SET_GAME', () => {
    SET_GAME(state, { id: 2 });

    expect(state.game).toEqual({
      id: 2,
      moves: 0,
    });
  });

  it('INCREMENT_MOVES', () => {
    INCREMENT_MOVES(state);

    expect(state.game.moves).toEqual(1);
  });
});
