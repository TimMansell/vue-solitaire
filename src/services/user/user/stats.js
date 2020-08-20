export const getLocalStats = () => JSON.parse(localStorage.getItem('userStats'));

export const setLocalStats = (stats) => localStorage.setItem('userStats', JSON.stringify(stats));

export const checkLocalStats = () => getLocalStats() !== null;
