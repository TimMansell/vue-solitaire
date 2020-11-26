import { getLocalUser, getServerUser } from '../index';

const mockSuid = 123;
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
    it('should get user id from getLocalUserID', () => {
      localStorage.setItem('luid', mockUid);

      const id = getLocalUser();

      expect(id).toEqual(mockUid);
    });

    it('should set user id from setLocalUserID', () => {
      const id = getLocalUser();
      const luid = localStorage.getItem('luid');

      expect(id).toEqual(mockUid);
      expect(luid).toEqual(mockUid);
    });
  });

  describe('getServerUser', () => {
    it('should get user id from getServerUserID', async () => {
      localStorage.setItem('suid', `${mockSuid}`);

      const id = await getServerUser(mockUid);

      expect(id).toEqual(`${mockSuid}`);
    });

    it('should set user id from getServerUserID', async () => {
      const id = await getServerUser(mockUid);

      expect(id).toEqual(mockSuid);
    });
  });
});
