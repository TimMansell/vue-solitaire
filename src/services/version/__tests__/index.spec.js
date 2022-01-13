import { mockVersionNumber } from '@/mockData';
import { getVersion, setVersion, checkVersion } from '../index';

describe('Version', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get default version from localStorage', () => {
    const version = getVersion();

    expect(version).toBe('0.0.1');
  });

  it('should get version from localStorage', () => {
    localStorage.setItem('appVersion', mockVersionNumber);

    const version = getVersion();

    expect(version).toBe(mockVersionNumber);
  });

  it('should set version in localStorage', () => {
    setVersion(mockVersionNumber);

    const appVersion = localStorage.getItem('appVersion');

    expect(appVersion).toBe(mockVersionNumber);
  });

  it('should convert an invalid version to a lower version', () => {
    const result = checkVersion('abc', mockVersionNumber);

    expect(result).toBe(true);
  });

  it('should be a lower version', () => {
    const result = checkVersion('0.0.1', mockVersionNumber);

    expect(result).toBe(true);
  });

  it('should not be a lower version', () => {
    const result = checkVersion(mockVersionNumber, mockVersionNumber);

    expect(result).toBe(false);
  });
});
