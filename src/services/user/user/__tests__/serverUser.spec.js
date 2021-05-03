import { createUserOnServer, checkUserExistsOnServer } from '../serverUser';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

jest.mock('@/services/db');

describe('User - Server User', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('createUserOnServer', () => {
    it('should get uid from response', async () => {
      const uid = await createUserOnServer(mockUid);

      expect(uid).toEqual(mockUid);
    });
  });

  describe('checkUserExistsOnServer', () => {
    it('should check user exists on server and return true', async () => {
      const userExists = await checkUserExistsOnServer(mockUid);

      expect(userExists).toEqual(true);
    });

    it('should check user exists on server and return false', async () => {
      const userExists = await checkUserExistsOnServer('123');

      expect(userExists).toEqual(false);
    });
  });
});
