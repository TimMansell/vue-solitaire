import numeral from 'numeral';
import { mockUid } from '../../../src/mockData';

describe('User', () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.interceptStatsAPI();
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.visit('/');

      cy.wait('@waitForStatsAPI');
    });

    it('it creates a new local user on initial page load', () => {
      const luid = localStorage.getItem('luid');

      // eslint-disable-next-line no-unused-expressions
      expect(luid).to.exist;
      expect(luid).to.not.equal('');
    });

    it('it creates a new user on server after first game has been played', () => {
      cy.get('[data-test="player-count"]').as('playerCount');

      cy.get('@playerCount').then(($playerCount) => {
        const intialPlayerCount = numeral($playerCount.text()).value();

        cy.newGame();

        cy.wait('@waitForStatsAPI');

        const newPlayerCount = numeral(intialPlayerCount + 1).format('0,0');

        cy.get('@playerCount')
          .text()
          .should('equal', newPlayerCount);
      });
    });

    it('it does not create a new user on server after second game has been played', () => {
      cy.get('[data-test="player-count"]').as('playerCount');

      cy.get('@playerCount').then(($playerCount) => {
        const intialPlayerCount = numeral($playerCount.text()).value();

        cy.newGame();

        cy.wait('@waitForStatsAPI');

        cy.newGame();

        cy.wait('@waitForStatsAPI');

        const newPlayerCount = numeral(intialPlayerCount + 1).format('0,0');

        cy.get('@playerCount')
          .text()
          .should('equal', newPlayerCount);
      });
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      localStorage.setItem('luid', mockUid);

      cy.visit('/');

      cy.wait('@waitForStatsAPI');
    });

    it('it does not create a new local user on initial page load', () => {
      const luid = localStorage.getItem('luid');

      expect(luid).to.equal(mockUid);
    });

    it('it does not create a new user on server after first game has been played', () => {
      cy.get('[data-test="player-count"]').as('playerCount');

      cy.get('@playerCount').then(($playerCount) => {
        const intialPlayerCount = $playerCount.text();

        cy.newGame();

        cy.wait('@waitForStatsAPI');

        cy.get('@playerCount')
          .text()
          .should('equal', intialPlayerCount);
      });
    });
  });
});
