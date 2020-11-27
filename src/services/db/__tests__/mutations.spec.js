import { newUser, gameNew, gameWon, gameLost, gameCompleted } from '../mutations';

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
  it('newUser', async () => {
    const result = await newUser(1);

    expect(result).toEqual({
      error: false,
      response: { createUser: 1 },
    });
  });

  it('gameNew', async () => {
    const result = await gameNew(1);

    expect(result).toEqual({
      error: false,
      response: { newGame: 1 },
    });
  });

  it('gameWon', async () => {
    const result = await gameWon(1);

    expect(result).toEqual({
      error: false,
      response: { wonGame: 1 },
    });
  });

  it('gameLost', async () => {
    const result = await gameLost(1);

    expect(result).toEqual({
      error: false,
      response: { lostGame: 1 },
    });
  });

  it('gameCompleted', async () => {
    const result = await gameCompleted(1);

    expect(result).toEqual({
      error: false,
      response: { completedGame: 1 },
    });
  });
});
