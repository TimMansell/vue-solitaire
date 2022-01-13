import semver from 'semver';

export const getVersion = () => localStorage.getItem('appVersion') || '0.0.1';

export const setVersion = (version) =>
  localStorage.setItem('appVersion', version);

export const checkVersion = (version, comparteToVersion) =>
  semver.lt(version, comparteToVersion);
