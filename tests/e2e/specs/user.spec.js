import numeral from 'numeral';
import { mockUid } from '../../../src/mockData';

describe('User', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.visitApp();
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

        cy.wait('@waitForInitialDataAPI');

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

        cy.wait('@waitForCreateUserAPI');
        cy.wait('@waitForInitialDataAPI');

        cy.newGame();

        cy.wait('@waitForInitialDataAPI');

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

      cy.visitApp();
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

        cy.wait('@waitForInitialDataAPI');

        cy.get('@playerCount')
          .text()
          .should('equal', intialPlayerCount);
      });
    });
  });
});
