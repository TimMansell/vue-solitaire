import { getServerUserID, checkServerUser, createServerUser, getServerUser } from '../serverUser';

const mockId = '123';

jest.mock('@/services/db', () => ({
  createUser: () => ({
    response: {
      _id: mockId,
    },
  }),
  getAUser: () => ({
    response: {
      uid: mockId,
    },
  }),
}));

describe('User - Server User', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get user id', () => {
    localStorage.setItem('suid', mockId);

    const id = getServerUserID();

    expect(id).toEqual(mockId);
  });

  it('should set user id from response', async () => {
    const user = await createServerUser();

    expect(user).toEqual(mockId);
  });

  it('should check user id exists and return true', () => {
    localStorage.setItem('suid', mockId);

    const user = checkServerUser();

    expect(user).toEqual(true);
  });

  it('should check user exists and return false', () => {
    const user = checkServerUser();

    expect(user).toEqual(false);
  });

  it('should get server user id from response', async () => {
    const user = await getServerUser();

    expect(user).toEqual(mockId);
  });
});
