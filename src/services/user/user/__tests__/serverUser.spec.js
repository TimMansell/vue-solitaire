import {
  checkServerUserSavedLocally,
  saveServerUserLocally,
  createServerUser,
  checkServerUserExists,
} from '../serverUser';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

jest.mock('@/services/db');

describe('User - Server User', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('checkServerUserSavedLocally', () => {
    it('should not be saved locally', () => {
      const userIsSavedLocally = checkServerUserSavedLocally();

      expect(userIsSavedLocally).toEqual(false);
    });

    it('should be saved locally', () => {
      localStorage.setItem('userExistsOnServer', 'true');

      const userIsSavedLocally = checkServerUserSavedLocally();

      expect(userIsSavedLocally).toEqual(true);
    });
  });

  describe('saveServerUserLocally', () => {
    it('should save user locally', () => {
      saveServerUserLocally();

      const userIsSavedLocally = localStorage.getItem('userExistsOnServer');

      expect(userIsSavedLocally).toEqual('true');
    });
  });

  describe('createServerUser', () => {
    it('should get uid from response', async () => {
      const uid = await createServerUser(mockUid);

      expect(uid).toEqual(mockUid);
    });
  });

  describe('checkServerUserExists', () => {
    it('should check user exists on server and return true', async () => {
      const userExists = await checkServerUserExists(mockUid);

      expect(userExists).toEqual(true);
    });

    it('should check user exists on server and return false', async () => {
      const userExists = await checkServerUserExists('123');

      expect(userExists).toEqual(false);
    });
  });
});
