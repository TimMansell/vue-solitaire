import { getLocalUser } from '../index';

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
});
