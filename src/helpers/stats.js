const { VUE_APP_ENABLE_STATS } = process.env;

// eslint-disable-next-line import/prefer-default-export
export const checkStatsFlag = () => VUE_APP_ENABLE_STATS === 'true';
