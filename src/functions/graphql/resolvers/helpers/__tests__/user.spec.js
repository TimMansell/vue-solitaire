import { mockPlayers } from '@/mockData';
import { createPlayerName } from '../user';

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
