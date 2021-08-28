import { checkAppVersion } from '@/services/db';

// eslint-disable-next-line import/prefer-default-export
export const getAppVersion = async () => {
  const { error, response } = await checkAppVersion();

  if (!error) {
    return response;
  }

  return '';
};
