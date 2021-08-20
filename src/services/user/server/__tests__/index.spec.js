import { mockUid, mockPlayerName } from '@/mockData';
import { createUser, getUser } from '../index';

jest.mock('@/services/db');

describe('User - Server User', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('createUser', () => {
    it('should get name from response', async () => {
      const { name } = await createUser(mockUid);

      expect(name).toEqual(mockPlayerName);
    });
  });

  describe('getUser', () => {
    it('should find an existing user', async () => {
      const { name, exists } = await getUser(mockUid);

      expect(name).toEqual(mockPlayerName);
      expect(exists).toEqual(true);
    });

    it('should not find an existing user', async () => {
      const { name, exists } = await getUser('123');

      expect(name).toEqual('');
      expect(exists).toEqual(false);
    });
  });
});
