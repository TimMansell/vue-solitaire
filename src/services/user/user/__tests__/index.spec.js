import {
  getLocalUser,
  checkUserExistsOnServer,
  createUserOnServer,
} from '../index';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

jest.mock('@/services/db');

jest.mock('uuid', () => ({
  v4: () => mockUid,
}));

describe('User', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getLocalUser', () => {
    it('should get user id from localStorage', () => {
      localStorage.setItem('luid', mockUid);

      const luid = getLocalUser();

      expect(luid).toEqual(mockUid);
    });

    it('should set user id in localStorage', () => {
      const luid = getLocalUser();
      const luidStorage = localStorage.getItem('luid');

      expect(luid).toEqual(mockUid);
      expect(luidStorage).toEqual(mockUid);
    });
  });

  describe('checkUserExistsOnServer', () => {
    it('should return a saved user in localStorage', async () => {
      localStorage.setItem('userExistsOnServer', 'true');

      const serverUserExists = await checkUserExistsOnServer(mockUid);

      expect(serverUserExists).toEqual(true);
    });

    it('should return user exists on server', async () => {
      const serverUserExists = await checkUserExistsOnServer(mockUid);

      expect(serverUserExists).toEqual(true);
    });

    it('should return user does not exist on server', async () => {
      const serverUserExists = await checkUserExistsOnServer('123');

      expect(serverUserExists).toEqual(false);
    });
  });

  describe('createUserOnServer', () => {
    it('should create a new user on the server and save userExistsOnServer in localStorage', async () => {
      const uid = await createUserOnServer(mockUid);
      const userExistsOnServer = localStorage.getItem('userExistsOnServer');

      expect(uid).toEqual(mockUid);
      expect(userExistsOnServer).toEqual('true');
    });
  });
});
