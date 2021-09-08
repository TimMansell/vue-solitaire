import { mockUid, mockPlayerName, mockDeck } from '@/mockData';
import { createUser, newGame, saveGame } from '../mutations';

jest.mock('../apollo');

const gameParams = {
  time: 10,
  moves: 50,
};

describe('DB service mutations', () => {
  it('createUser', async () => {
    const { name } = await createUser(mockUid);

    expect(name).toEqual(mockPlayerName);
  });

  it('newGame', async () => {
    const { cards } = await newGame(mockUid);

    expect(cards).toEqual(mockDeck);
  });

  it('saveGame', async () => {
    const { outcome } = await saveGame(mockUid, gameParams);

    expect(outcome).toEqual('Won');
  });
});
