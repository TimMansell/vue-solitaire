import { getBoardState } from '../helpers';

const vuex = {
  solitaire: {
    board: {
      cards: [
        [
          { id: '1d', value: '2', order: 1, suit: 'd', visible: true },
          { id: '1s', value: '2', order: 1, suit: 's', visible: false },
        ],
      ],
      foundation: [[], [], [], []],
    },
  },
};

describe('Solitaire Store', () => {
  it('getBoardState - saved game', () => {
    localStorage.setItem('vuex', JSON.stringify(vuex));

    const isNewGame = false;

    const result = getBoardState(isNewGame);

    expect(result).toEqual(vuex.solitaire.board);
  });

  it('getBoardState - new game', () => {
    localStorage.setItem('vuex', JSON.stringify(vuex));

    const isNewGame = true;

    const result = getBoardState(isNewGame);

    expect(result).toEqual('');
  });
});
