import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

// eslint-disable-next-line import/prefer-default-export
export const createPlayerName = (playerNamesInUse) => {
  const name = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '',
    style: 'capital',
  });

  const doesPlayerNameExist = playerNamesInUse.find(
    ({ name: playerName }) => playerName === name
  );

  if (doesPlayerNameExist) {
    return createPlayerName(playerNamesInUse);
  }

  return name;
};
