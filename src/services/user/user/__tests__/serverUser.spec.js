import { getServerUserID, checkServerUser, createServerUser, setServerUserID } from '../serverUser';

const mockSuid = 123;

jest.mock('@/services/db');

describe('User - Server User', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get user id', () => {
    localStorage.setItem('suid', `${mockSuid}`);

    const id = getServerUserID();

    expect(id).toEqual(`${mockSuid}`);
  });

  it('should set user id from response', async () => {
    const id = await createServerUser();

    expect(id).toEqual(mockSuid);
  });

  it('should check user id exists and return true', () => {
    localStorage.setItem('suid', `${mockSuid}`);

    const user = checkServerUser();

    expect(user).toEqual(true);
  });

  it('should check user exists and return false', () => {
    const user = checkServerUser();

    expect(user).toEqual(false);
  });

  it('should get server user id from response', async () => {
    const id = await setServerUserID();

    expect(id).toEqual(mockSuid);
  });
});
