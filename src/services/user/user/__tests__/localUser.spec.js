import {
  fetchLocalUser,
  createLocalUser,
  checkLocalUserExists,
} from '../localUser';

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

describe('User - Local User', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getLocalUser', () => {
    it('should get user id', () => {
      localStorage.setItem('luid', mockUid);

      const luid = fetchLocalUser();

      expect(luid).toEqual(mockUid);
    });

    it('should set user id', () => {
      const luid = createLocalUser();

      expect(luid).not.toEqual('');
    });
  });

  describe('checkLocalUserExists', () => {
    it('should check user id exists and return true', () => {
      localStorage.setItem('luid', mockUid);

      const user = checkLocalUserExists();

      expect(user).toEqual(true);
    });

    it('should check user exists and return false', () => {
      const user = checkLocalUserExists();

      expect(user).toEqual(false);
    });
  });
});
