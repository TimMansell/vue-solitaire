import { getLocalStats, setLocalStats, checkLocalStats } from '../stats';

const mockStats = {
  gameNumber: 1,
};

describe('User - stats', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get user stats', () => {
    localStorage.setItem('userStats', JSON.stringify(mockStats));

    const stats = getLocalStats();

    expect(stats).toEqual(mockStats);
  });

  it('should set user stats', () => {
    setLocalStats(mockStats);

    const stats = JSON.parse(localStorage.getItem('userStats'));

    expect(stats).toEqual(mockStats);
  });

  it('should check user stats exists and return true', () => {
    localStorage.setItem('userStats', JSON.stringify(mockStats));

    const stats = checkLocalStats();

    expect(stats).toEqual(true);
  });
});
