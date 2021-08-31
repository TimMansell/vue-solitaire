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

  it('saveGame - game won', async () => {
    const { outcome } = await saveGame(mockUid, gameParams, { won: true });

    expect(outcome).toEqual('Won');
  });

  it('saveGame - game lost', async () => {
    const { outcome } = await saveGame(mockUid, gameParams, { lost: true });

    expect(outcome).toEqual('Lost');
  });

  it('saveGame - game quit', async () => {
    const { outcome } = await saveGame(mockUid, gameParams, { quit: true });

    expect(outcome).toEqual('Gave Up');
  });
});
