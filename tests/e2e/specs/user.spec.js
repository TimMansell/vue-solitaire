import numeral from 'numeral';
import fullGameDeck from '../../fixtures/decks/fullGame.json';
import { mockUid } from '../../../src/mockData';

describe('User', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();

      cy.wait('@waitForInitialDataAPI');
    });

    it('it creates a new local user on initial page load', () => {
      const luid = localStorage.getItem('luid');

      // eslint-disable-next-line no-unused-expressions
      expect(luid).to.exist;
      expect(luid).to.not.equal('');
    });

    it('it creates a new user on server after first game has been played', () => {
      cy.get('[data-test="player-count"]').then(($playerCount) => {
        const intialPlayerCount = numeral($playerCount.text()).value();

        cy.startNewGame({ waitUser: true, waitInitial: true });

        const newPlayerCount = numeral(intialPlayerCount + 1).format('0,0');

        cy.checkPlayerCount(newPlayerCount);
      });
    });

    it('it does not create a new user on server after second game has been played', () => {
      cy.get('[data-test="player-count"]').then(($playerCount) => {
        const intialPlayerCount = numeral($playerCount.text()).value();

        cy.startNewGame({ waitUser: true });

        cy.startNewGame({ waitInitial: true });

        const newPlayerCount = numeral(intialPlayerCount + 1).format('0,0');

        cy.checkPlayerCount(newPlayerCount);
      });
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      localStorage.setItem('luid', mockUid);

      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp();

      cy.wait('@waitForInitialDataAPI');
    });

    it('it does not create a new local user on initial page load', () => {
      const luid = localStorage.getItem('luid');

      expect(luid).to.equal(mockUid);
    });

    it('it does not create a new user on server after first game has been played', () => {
      cy.get('[data-test="player-count"]').then(($playerCount) => {
        const intialPlayerCount = $playerCount.text();

        cy.startNewGame();

        cy.checkPlayerCount(intialPlayerCount);
      });
    });
  });
});
