import { newUser, gameWon, gameLost, gameQuit } from '../mutations';

jest.mock('../apollo');

describe('DB service mutations', () => {
  it('newUser', async () => {
    const result = await newUser(1);

    expect(result).toEqual({
      error: false,
      response: { createUser: 1 },
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

  it('gameQuit', async () => {
    const result = await gameQuit(1);

    expect(result).toEqual({
      error: false,
      response: { quitGame: 1 },
    });
  });
});
