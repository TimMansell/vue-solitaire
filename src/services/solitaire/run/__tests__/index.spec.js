import { checkGameState, checkGameTime, checkGameMoves } from '../index';

import fullGameDeck from '../../../../../tests/fixtures/decks/fullGame.json';
import fullGameMoves from '../../../../../tests/fixtures/moves/fullGame.json';
import incompleteGameDeck from '../../../../../tests/fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../../../../tests/fixtures/moves/incompleteGame.json';
import quitGameDeck from '../../../../../tests/fixtures/decks/quitGame.json';
import quitGameMoves from '../../../../../tests/fixtures/moves/quitGame.json';

describe('run', () => {
  describe('checkGameState', () => {
    it('should be won game', () => {
      const { isGameFinished, hasMoves } = checkGameState(
        fullGameMoves,
        fullGameDeck
      );

      expect(isGameFinished).toBe(true);
      expect(hasMoves).toBe(false);
    });

    it('should be lost game', () => {
      const { isGameFinished, hasMoves } = checkGameState(
        incompleteGameMoves,
        incompleteGameDeck
      );

      expect(isGameFinished).toBe(false);
      expect(hasMoves).toBe(false);
    });

    it('should be quit game', () => {
      const { isGameFinished, hasMoves } = checkGameState(
        quitGameMoves,
        quitGameDeck
      );

      expect(isGameFinished).toBe(false);
      expect(hasMoves).toBe(true);
    });

    it('should be quit game is moves do not complete game', () => {
      const { isGameFinished, hasMoves } = checkGameState(
        incompleteGameMoves,
        fullGameDeck
      );

      expect(isGameFinished).toBe(false);
      expect(hasMoves).toBe(true);
    });
  });

  describe('checkGameTime', () => {
    it('should be a valid time', () => {
      const hash = 'A95OcEhvtULiVtN4N2QP9';

      const time = [
        {
          date: '2021-10-15T06:08:33.792Z',
          hash: '7afcb87b00122c2f4fa10a53693faaa8d030ac63214a4b7528049e8233664d53',
        },
        {
          date: '2021-10-15T06:08:34.795Z',
          hash: 'cd73f133ef8b02c045d975506b79b1c7db921eec57d2683bfb17fcc2554f9009',
        },
        {
          date: '2021-10-15T06:08:35.797Z',
          hash: '14fb12ab05dbafe6aac9cffe95e385b97afc621df3d611f6a19a6cec9ae79054',
        },
        {
          date: '2021-10-15T06:15:43.214Z',
          hash: '833e792f562f78fa62751f4fcb59f37d028d1517090f4c44e77efb08929505aa',
        },
      ];

      const result = checkGameTime(time, hash);

      expect(result).toBe(true);
    });

    it('should not be a valid time with invalid date', () => {
      const hash = 'A95OcEhvtULiVtN4N2QP9';

      const time = [
        {
          date: '2021-10-15T06:07:33.792Z',
          hash: '7afcb87b00122c2f4fa10a53693faaa8d030ac63214a4b7528049e8233664d53',
        },
        {
          date: '2021-10-15T06:08:34.795Z',
          hash: 'cd73f133ef8b02c045d975506b79b1c7db921eec57d2683bfb17fcc2554f9009',
        },
        {
          date: '2021-10-15T06:08:35.797Z',
          hash: '14fb12ab05dbafe6aac9cffe95e385b97afc621df3d611f6a19a6cec9ae79054',
        },
        {
          date: '2021-10-15T06:15:43.214Z',
          hash: '833e792f562f78fa62751f4fcb59f37d028d1517090f4c44e77efb08929505aa',
        },
      ];

      const result = checkGameTime(time, hash);

      expect(result).toBe(false);
    });

    it('should not be a valid time with invalid hash', () => {
      const hash = 'A95OcEhvtULiVtN4N2QP9';

      const time = [
        {
          date: '2021-10-15T06:08:33.792Z',
          hash: '7afcb87b00122c2f4fa10a53693faaa8d030ac63214a4b7528049e8233664d52',
        },
        {
          date: '2021-10-15T06:08:34.795Z',
          hash: 'cd73f133ef8b02c045d975506b79b1c7db921eec57d2683bfb17fcc2554f9009',
        },
        {
          date: '2021-10-15T06:08:35.797Z',
          hash: '14fb12ab05dbafe6aac9cffe95e385b97afc621df3d611f6a19a6cec9ae79054',
        },
        {
          date: '2021-10-15T06:15:43.214Z',
          hash: '833e792f562f78fa62751f4fcb59f37d028d1517090f4c44e77efb08929505aa',
        },
      ];

      const result = checkGameTime(time, hash);

      expect(result).toBe(false);
    });
  });

  describe.only('checkGameMoves', () => {
    it('should have valid move times', () => {
      const moves = [
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          hash: '7afcb87b00122c2f4fa10a53693faaa8d030ac63214a4b7528049e8233664d53',
        },
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          hash: '14fb12ab05dbafe6aac9cffe95e385b97afc621df3d611f6a19a6cec9ae79054',
        },
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          hash: '833e792f562f78fa62751f4fcb59f37d028d1517090f4c44e77efb08929505aa',
        },
      ];

      const time = [
        {
          date: '2021-10-15T06:08:33.792Z',
          hash: '7afcb87b00122c2f4fa10a53693faaa8d030ac63214a4b7528049e8233664d53',
        },
        {
          date: '2021-10-15T06:08:34.795Z',
          hash: 'cd73f133ef8b02c045d975506b79b1c7db921eec57d2683bfb17fcc2554f9009',
        },
        {
          date: '2021-10-15T06:08:35.797Z',
          hash: '14fb12ab05dbafe6aac9cffe95e385b97afc621df3d611f6a19a6cec9ae79054',
        },
        {
          date: '2021-10-15T06:15:43.214Z',
          hash: '833e792f562f78fa62751f4fcb59f37d028d1517090f4c44e77efb08929505aa',
        },
      ];

      const result = checkGameMoves(moves, time);

      expect(result).toBe(true);
    });

    it('should not have valid moves time with invalid hash', () => {
      const moves = [
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          hash: '7afcb87b00122c2f4fa10a53693faaa8d030ac63214a4b7528049e8233664d53',
        },
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          hash: '14fb12ab05dbafe6aac9cffe95e385b97afc621df3d611f6a19a6cec9ae790xx',
        },
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          hash: '833e792f562f78fa62751f4fcb59f37d028d1517090f4c44e77efb08929505aa',
        },
      ];

      const time = [
        {
          date: '2021-10-15T06:08:33.792Z',
          hash: '7afcb87b00122c2f4fa10a53693faaa8d030ac63214a4b7528049e8233664d52',
        },
        {
          date: '2021-10-15T06:08:34.795Z',
          hash: 'cd73f133ef8b02c045d975506b79b1c7db921eec57d2683bfb17fcc2554f9009',
        },
        {
          date: '2021-10-15T06:08:35.797Z',
          hash: '14fb12ab05dbafe6aac9cffe95e385b97afc621df3d611f6a19a6cec9ae79054',
        },
        {
          date: '2021-10-15T06:15:43.214Z',
          hash: '833e792f562f78fa62751f4fcb59f37d028d1517090f4c44e77efb08929505aa',
        },
      ];

      const result = checkGameMoves(moves, time);

      expect(result).toBe(false);
    });
  });
});
