import { getUser, setUser, checkUser } from '../index';

const uid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

describe('User', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get user', () => {
    localStorage.setItem('uid', uid);

    const user = getUser();

    expect(user).toEqual(uid);
  });

  it('should set user', () => {
    const user = setUser();

    expect(user).not.toEqual('');
  });

  it('should check user and return true', () => {
    localStorage.setItem('uid', uid);

    const user = checkUser();

    expect(user).toEqual(true);
  });

  it('should check user and return false', () => {
    const user = checkUser();

    expect(user).toEqual(false);
  });
});
