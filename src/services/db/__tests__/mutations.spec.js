import { createUser, newGame, gameWon, gameLost, gameCompleted } from '../mutations';

jest.mock('../apollo', () => ({
  mutate: () => ({
    data: {
      createUser: 1,
      newGame: 1,
      wonGame: 1,
      lostGame: 1,
      completedGame: 1,
    },
  }),
}));

describe('DB service mutations', () => {
  it('createUser', async () => {
    const result = await createUser(1);

    expect(result).toEqual({
      error: false,
      response: 1,
    });
  });

  it('newGame', async () => {
    const result = await newGame(1);

    expect(result).toEqual({
      error: false,
      response: 1,
    });
  });

  it('gameWon', async () => {
    const result = await gameWon(1);

    expect(result).toEqual({
      error: false,
      response: 1,
    });
  });

  it('gameLost', async () => {
    const result = await gameLost(1);

    expect(result).toEqual({
      error: false,
      response: 1,
    });
  });

  it('gameCompleted', async () => {
    const result = await gameCompleted(1);

    expect(result).toEqual({
      error: false,
      response: 1,
    });
  });
});
