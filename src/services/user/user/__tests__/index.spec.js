import { getLocalUser, getServerUser } from '../index';

const mockId = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

jest.mock('@/services/db', () => ({
  getAUser: () => ({
    response: {
      uid: mockId,
    },
  }),
}));

jest.mock('uuid', () => ({
  v4: () => mockId,
}));

describe('User', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getLocalUser', () => {
    it('should get user id from getLocalUserID', () => {
      localStorage.setItem('luid', mockId);

      const id = getLocalUser();

      expect(id).toEqual(mockId);
    });

    it('should set user id from setLocalUserID', () => {
      const id = getLocalUser();
      const luid = localStorage.getItem('luid');

      expect(id).toEqual(mockId);
      expect(luid).toEqual(mockId);
    });
  });

  describe('getServerUser', () => {
    it('should get user id from getServerUserID', async () => {
      localStorage.setItem('suid', mockId);

      const id = await getServerUser();

      expect(id).toEqual(mockId);
    });

    it('should get user id from getServerUserID', async () => {
      const id = await getServerUser();

      expect(id).toEqual(mockId);
    });
  });
});
