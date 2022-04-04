import { mockVersionNumber } from '@/mockData';
import { getVersion, getOldVersion, updateVersion } from '../index';
import { version } from '../../../../package.json';

describe('Version', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get correct version', () => {
    const currentVersion = getVersion();

    expect(currentVersion).toBe(version);
  });

  it('should return an old version', () => {
    localStorage.setItem(mockVersionNumber, '');

    const oldVersion = getOldVersion();

    expect(oldVersion).toBe(mockVersionNumber);
  });

  it('should return a legacy version', () => {
    localStorage.setItem('vuex', '');

    const oldVersion = getOldVersion();

    expect(oldVersion).toBe('vuex');
  });

  it('should update version', () => {
    localStorage.setItem(mockVersionNumber, '');

    const update = updateVersion();
    const oldVersion = getOldVersion();

    expect(update).toBeTruthy();
    expect(oldVersion).toBeUndefined();
  });

  it('should update legacy version', () => {
    localStorage.setItem('vuex', '');

    const update = updateVersion();
    const oldVersion = getOldVersion();

    expect(update).toBeTruthy();
    expect(oldVersion).toBeUndefined();
  });

  it('should not update version', () => {
    localStorage.setItem(`v${version}`, '');

    const update = updateVersion();

    expect(update).toBeFalsy();
  });
});
