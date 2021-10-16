import { checkGameState, checkGameTime, checkGameMoves } from '../index';

import fullGameDeck from '../../../../../tests/fixtures/decks/fullGame.json';
import fullGameMoves from '../../../../../tests/fixtures/moves/fullGame.json';
import incompleteGameDeck from '../../../../../tests/fixtures/decks/incompleteGame.json';
import incompleteGameMoves from '../../../../../tests/fixtures/moves/incompleteGame.json';
import quitGameDeck from '../../../../../tests/fixtures/decks/quitGame.json';
import quitGameMoves from '../../../../../tests/fixtures/moves/quitGame.json';

const startTime = '2021-10-16T04:08:51.998Z';
const endTime = '2021-10-16T04:08:57.006Z';
const times = [
  {
    date: '2021-10-16T04:08:52.998Z',
    hash: 'd445f6b02581703100547644177ae4aca2425f158c6c69fb36be6e2a36ab3e53',
  },
  {
    date: '2021-10-16T04:08:54.000Z',
    hash: 'f6443923e02401b7e72bf27fc9dc9c8cee98f971cc8bea01586baaa697934cbf',
  },
  {
    date: '2021-10-16T04:08:55.004Z',
    hash: '6cf61b96423d0888c9344ab13e1923a5a0a7c3089cd71a2eb1cad766407942a1',
  },
  {
    date: '2021-10-16T04:08:56.006Z',
    hash: '8f35982ac17c63f6c25d3de8a5421b1211d4855d77dae1c02753b877b0e43e90',
  },
];
const hash = 'Wfy_b8ACBz6oI_Lr50jsB';

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
      const result = checkGameTime(times, hash, startTime, endTime);

      expect(result).toBe(true);
    });

    it('should not be a valid time due to wrong hash', () => {
      const wrongHash = 'Wfy_b8ACBz6oI_Lr50jsc';

      const result = checkGameTime(times, wrongHash, startTime, endTime);

      expect(result).toBe(false);
    });

    it('should not be a valid time due to invalid date', () => {
      const wrongTimes = [
        {
          date: '2021-10-16T04:08:52.898Z', // wrong time
          hash: 'd445f6b02581703100547644177ae4aca2425f158c6c69fb36be6e2a36ab3e53',
        },
        {
          date: '2021-10-16T04:08:54.000Z',
          hash: 'f6443923e02401b7e72bf27fc9dc9c8cee98f971cc8bea01586baaa697934cbf',
        },
        {
          date: '2021-10-16T04:08:55.004Z',
          hash: '6cf61b96423d0888c9344ab13e1923a5a0a7c3089cd71a2eb1cad766407942a1',
        },
        {
          date: '2021-10-16T04:08:56.006Z',
          hash: '8f35982ac17c63f6c25d3de8a5421b1211d4855d77dae1c02753b877b0e43e90',
        },
      ];

      const result = checkGameTime(wrongTimes, hash, startTime, endTime);

      expect(result).toBe(false);
    });

    it('should not be a valid time due to invalid hash', () => {
      const wrongTimes = [
        {
          date: '2021-10-16T04:08:52.998Z',
          hash: 'd445f6b02581703100547644177ae4aca2425f158c6c69fb36be6e2a36ab3e53',
        },
        {
          date: '2021-10-16T04:08:54.000Z',
          hash: 'f6443923e02401b7e72bf27fc9dc9c8cee98f971cc8bea01586baaa697934cbf',
        },
        {
          date: '2021-10-16T04:08:55.004Z',
          hash: '6cf61b96423d0888c9344ab13e1923a5a0a7c3089cd71a2eb1cad766407942ax', // wrong hash
        },
        {
          date: '2021-10-16T04:08:56.006Z',
          hash: '8f35982ac17c63f6c25d3de8a5421b1211d4855d77dae1c02753b877b0e43e90',
        },
      ];

      const result = checkGameTime(wrongTimes, hash, startTime, endTime);

      expect(result).toBe(false);
    });

    it('should not be a valid time due to game starting before start time', () => {
      const wrongTimes = [
        {
          date: '2021-10-16T04:08:50.998Z', // wrong time
          hash: 'd445f6b02581703100547644177ae4aca2425f158c6c69fb36be6e2a36ab3e53',
        },
        {
          date: '2021-10-16T04:08:54.000Z',
          hash: 'f6443923e02401b7e72bf27fc9dc9c8cee98f971cc8bea01586baaa697934cbf',
        },
        {
          date: '2021-10-16T04:08:55.004Z',
          hash: '6cf61b96423d0888c9344ab13e1923a5a0a7c3089cd71a2eb1cad766407942a1',
        },
        {
          date: '2021-10-16T04:08:56.006Z',
          hash: '8f35982ac17c63f6c25d3de8a5421b1211d4855d77dae1c02753b877b0e43e90',
        },
      ];

      const result = checkGameTime(wrongTimes, hash, startTime, endTime);

      expect(result).toBe(false);
    });

    it('should not be a valid time due to game ending before end time', () => {
      const wrongTimes = [
        {
          date: '2021-10-16T04:08:52.998Z',
          hash: 'd445f6b02581703100547644177ae4aca2425f158c6c69fb36be6e2a36ab3e53',
        },
        {
          date: '2021-10-16T04:08:54.000Z',
          hash: 'f6443923e02401b7e72bf27fc9dc9c8cee98f971cc8bea01586baaa697934cbf',
        },
        {
          date: '2021-10-16T04:08:55.004Z',
          hash: '6cf61b96423d0888c9344ab13e1923a5a0a7c3089cd71a2eb1cad766407942a1',
        },
        {
          date: '2021-10-16T04:08:58.006Z', // wrong time
          hash: '8f35982ac17c63f6c25d3de8a5421b1211d4855d77dae1c02753b877b0e43e90',
        },
      ];
      const result = checkGameTime(wrongTimes, hash, startTime, endTime);

      expect(result).toBe(false);
    });
  });

  describe('checkGameMoves', () => {
    it('should have valid moves if no moves is emtpy', () => {
      const moves = [];

      const result = checkGameMoves(moves, times, startTime, endTime);

      expect(result).toBe(true);
    });

    it('should have valid move times', () => {
      const moves = [
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          date: '2021-10-16T04:08:54.000Z',
          hash: 'f6443923e02401b7e72bf27fc9dc9c8cee98f971cc8bea01586baaa697934cbf',
        },
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          date: '2021-10-16T04:08:55.004Z',
          hash: '6cf61b96423d0888c9344ab13e1923a5a0a7c3089cd71a2eb1cad766407942a1',
        },
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          date: '2021-10-16T04:08:56.006Z',
          hash: '8f35982ac17c63f6c25d3de8a5421b1211d4855d77dae1c02753b877b0e43e90',
        },
      ];

      const result = checkGameMoves(moves, times, startTime, endTime);

      expect(result).toBe(true);
    });

    it('should not have valid moves time due to invalid hash', () => {
      const moves = [
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          date: '2021-10-16T04:08:54.000Z',
          hash: 'f6443923e02401b7e72bf27fc9dc9c8cee98f971cc8bea01586baaa697934cbf',
        },
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          date: '2021-10-16T04:08:55.004Z',
          hash: 'b608c667db61bda910fe266e678dbd6e76088361', // wrong hash
        },
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          date: '2021-10-16T04:08:56.006Z',
          hash: '8f35982ac17c63f6c25d3de8a5421b1211d4855d77dae1c02753b877b0e43e90',
        },
      ];

      const result = checkGameMoves(moves, times, startTime, endTime);

      expect(result).toBe(false);
    });

    it('should not have valid moves time due to earlier move than start time', () => {
      const moves = [
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          date: '2021-10-16T04:08:50.004Z', // wrong time
          hash: 'f6443923e02401b7e72bf27fc9dc9c8cee98f971cc8bea01586baaa697934cbf',
        },
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          date: '2021-10-16T04:08:55.004Z',
          hash: 'b608c667db61bda910fe266e678dbd6e76088360',
        },
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          date: '2021-10-16T04:08:56.006Z',
          hash: '8f35982ac17c63f6c25d3de8a5421b1211d4855d77dae1c02753b877b0e43e90',
        },
      ];

      const result = checkGameMoves(moves, times, startTime, endTime);

      expect(result).toBe(false);
    });

    it('should not have valid moves time due to move time being before previous move time', () => {
      const moves = [
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          date: '2021-10-16T04:08:56.004Z', // wrong time
          hash: 'f6443923e02401b7e72bf27fc9dc9c8cee98f971cc8bea01586baaa697934cbf',
        },
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          date: '2021-10-16T04:08:55.004Z',
          hash: '6cf61b96423d0888c9344ab13e1923a5a0a7c3089cd71a2eb1cad766407942a1',
        },
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          date: '2021-10-16T04:08:56.006Z',
          hash: '8f35982ac17c63f6c25d3de8a5421b1211d4855d77dae1c02753b877b0e43e90',
        },
      ];

      const result = checkGameMoves(moves, times, startTime, endTime);

      expect(result).toBe(false);
    });

    it('should not have valid moves time due to move after end time', () => {
      const moves = [
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          date: '2021-10-16T04:08:54.000Z',
          hash: 'f6443923e02401b7e72bf27fc9dc9c8cee98f971cc8bea01586baaa697934cbf',
        },
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          date: '2021-10-16T04:08:55.004Z',
          hash: '6cf61b96423d0888c9344ab13e1923a5a0a7c3089cd71a2eb1cad766407942a1',
        },
        {
          selectedCardId: 14,
          selectedColumn: 2,
          isFoundation: true,
          date: '2021-10-16T04:08:58.006Z', // wrong time
          hash: '8f35982ac17c63f6c25d3de8a5421b1211d4855d77dae1c02753b877b0e43e90',
        },
      ];

      const result = checkGameMoves(moves, times, startTime, endTime);

      expect(result).toBe(false);
    });
  });
});
