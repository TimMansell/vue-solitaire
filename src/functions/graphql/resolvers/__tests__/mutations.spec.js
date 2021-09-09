import { mockUid, mockPlayerName } from '@/mockData';
import { createUser, newGame, saveGame } from '../mutations';
import {
  wrapClient,
  createMockFindOne,
  createMockInsertOne,
  createMockDeleteOne,
} from '../__mocks__/mockDb';
import fullGameDeck from '../../../../../tests/fixtures/decks/fullGame.json';
import fullGameMoves from '../../../../../tests/fixtures/moves/fullGame.json';
import incompleteGameDeck from '../../../../../tests/fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../../../../tests/fixtures/moves/incompleteGame.json';
import quitGameDeck from '../../../../../tests/fixtures/decks/quitGame.json';
import quitGameMoves from '../../../../../tests/fixtures/moves/quitGame.json';

jest.mock('unique-names-generator', () => ({
  uniqueNamesGenerator: () => mockPlayerName,
}));

describe('Graphql Mutation Resolvers', () => {
  describe('Users', () => {
    it('createUser', async () => {
      const mockClient = wrapClient({
        ...createMockInsertOne({}),
      });

      const mockContext = {
        ...mockClient,
        variables: {
          uid: mockUid,
        },
      };

      const { name } = await createUser('', {}, mockContext);

      expect(name).toBe(mockPlayerName);
    });
  });

  describe('New Game', () => {
    it('newGame', async () => {
      const mockClient = wrapClient({ ...createMockDeleteOne(mockUid) });

      const mockContext = {
        ...mockClient,
        variables: {
          uid: mockUid,
        },
      };

      const { cards } = await newGame('', {}, mockContext);

      expect(cards).toHaveLength(52);
    });
  });

  describe('Save Game', () => {
    it('it should return won game', async () => {
      const mockClient = wrapClient({
        ...createMockFindOne({ cards: fullGameDeck }),
        ...createMockInsertOne({}),
      });

      const mockContext = {
        ...mockClient,
        variables: {
          uid: mockUid,
          moves: fullGameMoves,
          time: 15,
        },
      };

      const { outcome } = await saveGame('', '', mockContext);

      expect(outcome).toBe('Won');
    });

    it('it should return lost game', async () => {
      const mockClient = wrapClient({
        ...createMockFindOne({ cards: incompleteGameDeck }),
        ...createMockInsertOne({}),
      });

      const mockContext = {
        ...mockClient,
        variables: {
          uid: mockUid,
          moves: incompleteGameMoves,
          time: 15,
        },
      };

      const { outcome } = await saveGame('', '', mockContext);

      expect(outcome).toBe('Lost');
    });

    it('it should return quit game', async () => {
      const mockClient = wrapClient({
        ...createMockFindOne({ cards: quitGameDeck }),
        ...createMockInsertOne({}),
      });

      const mockContext = {
        ...mockClient,
        variables: {
          uid: mockUid,
          moves: quitGameMoves,
          time: 15,
        },
      };

      const { outcome } = await saveGame('', '', mockContext);

      expect(outcome).toBe('Gave Up');
    });
  });
});
