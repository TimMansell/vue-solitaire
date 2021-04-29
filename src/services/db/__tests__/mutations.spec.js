import { newUser, gameWon, gameLost, gameQuit } from '../mutations';

jest.mock('../apollo');

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

const gameParams = {
  luid: mockUid,
  time: 10,
  moves: 50,
};

const gameResults = {
  date: '2021',
  completed: true,
  time: 10,
  moves: 50,
};

describe('DB service mutations', () => {
  it('newUser', async () => {
    const { response } = await newUser(mockUid);
    const { createUser } = response;

    expect(createUser).toEqual({ uid: mockUid });
  });

  it('gameWon', async () => {
    const { response } = await gameWon(gameParams);
    const { wonGame } = response;

    expect(wonGame).toEqual({
      ...gameResults,
      won: true,
      lost: false,
    });
  });

  it('gameLost', async () => {
    const { response } = await gameLost(gameParams);
    const { lostGame } = response;

    expect(lostGame).toEqual({
      ...gameResults,
      won: false,
      lost: true,
    });
  });

  it('gameQuit', async () => {
    const { response } = await gameQuit(gameParams);
    const { quitGame } = response;

    expect(quitGame).toEqual({
      ...gameResults,
      won: false,
      lost: false,
    });
  });
});
