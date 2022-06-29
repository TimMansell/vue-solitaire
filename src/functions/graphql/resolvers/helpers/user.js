import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

export const getPlayerName = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '',
    style: 'capital',
  });

export const createPlayerName = (namesInUse, createName = getPlayerName) => {
  const playerName = createName();

  const doesPlayerNameExist = namesInUse.find(
    ({ name }) => playerName === name
  );

  if (doesPlayerNameExist) {
    return createPlayerName(namesInUse, getPlayerName);
  }

  return playerName;
};
