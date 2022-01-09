import semver from 'semver';

export const getVersion = () => localStorage.getItem('appVersion');

export const setVersion = (version) =>
  localStorage.setItem('appVersion', version);

export const checkVersionIsOutdated = (version1, version2) => {
  if (version1 === null) return true;

  const isVersionLower = semver.lt(version1, version2);

  return isVersionLower;
};

export const checkVersionIsLatest = (version1, version2) =>
  semver.eq(version1, version2);
