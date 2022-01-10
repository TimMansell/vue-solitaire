import semver from 'semver';

export const getVersion = () => localStorage.getItem('appVersion') || '0.0.1';

export const setVersion = (version) =>
  localStorage.setItem('appVersion', version);

export const checkVersionIsOutdated = (version1, version2) =>
  semver.lt(version1, version2);

export const checkVersionIsLatest = (version1, version2) =>
  semver.eq(version1, version2);
