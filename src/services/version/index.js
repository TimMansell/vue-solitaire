import semver from 'semver';

export const getVersion = () => localStorage.getItem('appVersion') || '0.0.1';

export const setVersion = (version) =>
  localStorage.setItem('appVersion', version);

export const checkVersion = (version, comparteToVersion) => {
  const isValid = semver.valid(version);
  const compareVersion = isValid ? version : '0.0.1';

  return semver.lt(compareVersion, comparteToVersion);
};
