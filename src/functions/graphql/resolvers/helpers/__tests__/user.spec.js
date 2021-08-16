import { createPlayerName } from '../user';

const mockPlayers = [
  { uid: '7dac9d78-353f-409b-8a7f-2192409c44a2', name: 'Player 1' },
  { uid: '2cbf658a-3102-4e9d-b749-bac853efed0d', name: 'Player 2' },
];

describe('Graphql Resolver Helpers', () => {
  it('should not find new name in existing player name', async () => {
    const newName = () => 'test';

    const result = await createPlayerName(mockPlayers, newName);

    const playerNames = mockPlayers.map(({ name }) => name);
    const doesPlayerNameExist = playerNames.includes(result);

    expect(doesPlayerNameExist).toBe(false);
    expect(result).toBe(newName());
  });

  it('should find new name in existing player name and create a new name until it does not exist', async () => {
    const newName = () => 'Player 1';

    const result = await createPlayerName(mockPlayers, newName);

    const playerNames = mockPlayers.map(({ name }) => name);
    const doesPlayerNameExist = playerNames.includes(result);

    expect(doesPlayerNameExist).toBe(false);
    expect(result).not.toBe(newName());
  });
});
