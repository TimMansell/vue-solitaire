const { ENABLE_STATS } = process.env;

// eslint-disable-next-line import/prefer-default-export
export const checkStatsFlag = () => ENABLE_STATS === 'true';
