import lt from 'semver/functions/lt';
import valid from 'semver/functions/valid';
import { version } from '../../../package.json';

export const getVersion = () => version;

export const getOldVersion = () => {
  const keys = Object.keys(localStorage);
  const legacyVersion = keys.filter((key) => key.includes('vuex'));
  const olderVersion = keys.filter((key) => valid(key) && lt(key, version));

  const [oldVersion] = [...legacyVersion, ...olderVersion];

  return oldVersion;
};

export const updateVersion = () => {
  const oldVersion = getOldVersion();

  if (oldVersion) {
    localStorage.removeItem(oldVersion);
    return true;
  }

  return false;
};
