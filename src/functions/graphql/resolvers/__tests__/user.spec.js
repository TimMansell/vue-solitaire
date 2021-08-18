import tzMock from 'timezone-mock';
import { history, exists, name } from '../user';
import {
  wrapClient,
  createMockFind,
  createMockFiltered,
  createMockCount,
  createMockFindOne,
} from '../__mocks__/mockDb';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

const mockHistoryApi = [
  {
    date: '2021-05-20T23:34:49.564Z',
    won: false,
    lost: false,
    moves: 1,
    time: 12,
  },
  {
    date: '2021-05-19T23:34:49.564Z',
    won: true,
    lost: false,
    moves: 2,
    time: 12,
  },
  {
    date: '2021-05-19T23:34:49.564Z',
    won: false,
    lost: true,
    moves: 2,
    time: 12,
  },
  {
    date: '2021-05-19T23:34:49.564Z',
    won: true,
    lost: false,
    moves: 2,
    time: 12,
  },
];

const mockHistory = [
  {
    date: '20-05-2021',
    time: '23:34:49',
    duration: '0:00:12',
    moves: 1,
    number: '4',
    outcome: 'Gave Up',
  },
  {
    date: '19-05-2021',
    time: '23:34:49',
    duration: '0:00:12',
    moves: 2,
    number: '3',
    outcome: 'Won',
  },
  {
    date: '19-05-2021',
    time: '23:34:49',
    duration: '0:00:12',
    moves: 2,
    number: '2',
    outcome: 'Lost',
  },
  {
    date: '19-05-2021',
    time: '23:34:49',
    duration: '0:00:12',
    moves: 2,
    number: '1',
    outcome: 'Won',
  },
];

const mockPlayerName = 'Player Name';

tzMock.register('UTC');

describe('Graphql User Resolvers', () => {
  describe('exists', () => {
    it('should return exists = true', async () => {
      const mockContext = wrapClient(
        createMockFind({
          ...createMockCount(1),
        })
      );

      const result = await exists({ uid: mockUid }, '', mockContext);

      expect(result).toEqual(1);
    });

    it('should return exists = false', async () => {
      const mockContext = wrapClient(
        createMockFind({
          ...createMockCount(0),
        })
      );

      const result = await exists({ uid: mockUid }, '', mockContext);

      expect(result).toEqual(0);
    });
  });

  describe('history', () => {
    it('should return users game history', async () => {
      const mockContext = wrapClient(
        createMockFind({
          ...createMockFiltered(mockHistoryApi),
          ...createMockCount(mockHistoryApi.length),
        })
      );

      const result = await history(
        { uid: mockUid },
        { offset: 0 },
        mockContext
      );

      expect(result).toEqual(mockHistory);
    });
  });

  describe('name', () => {
    it('should return users name', async () => {
      const mockContext = wrapClient({
        ...createMockFindOne({ name: mockPlayerName }),
        ...createMockCount(0),
      });

      const result = await name({ uid: mockUid }, '', mockContext);

      expect(result).toBe(mockPlayerName);
    });
  });
});
