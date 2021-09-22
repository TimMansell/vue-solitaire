import fullGameDeck from '../../fixtures/decks/fullGame.json';
import { mockUid, mockNewUid } from '../../../src/mockData';

describe('User', () => {
  afterEach(() => {
    cy.clearTest();
  });

  describe('Default', () => {
    beforeEach(() => {
      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp({ waitInitial: true });
    });

    it('it creates a new local user on initial page load', () => {
      const luid = localStorage.getItem('luid');

      // eslint-disable-next-line no-unused-expressions
      expect(luid).to.exist;
      expect(luid).to.not.equal('');
      expect(luid).to.not.equal(mockUid);
      expect(luid).to.not.equal(mockNewUid);
    });
  });

  describe('New User', () => {
    beforeEach(() => {
      cy.setUser(mockNewUid);

      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp({ waitInitial: true });
    });

    afterEach(() => {
      cy.clearUser({ user: true, games: true, deck: true });
    });

    it('it creates a new user on server after first game has been played', () => {
      cy.savePlayerCount();

      cy.startNewGame({ waitUser: true, waitInitial: true });

      cy.checkPlayerCount({ equal: true, incremented: true });
    });

    it('it does not create a new user on server after second game has been played', () => {
      cy.savePlayerCount();

      cy.startNewGame({ waitUser: true, waitInitial: true });

      cy.checkPlayerCount({ equal: true, incremented: true });

      cy.savePlayerCount();

      cy.startNewGame({ waitInitial: true });

      cy.checkPlayerCount({ equal: true });
    });
  });

  describe('Existing User', () => {
    beforeEach(() => {
      cy.setUser(mockUid);

      cy.mockApi({
        mockDeck: fullGameDeck,
      });

      cy.visitApp({ waitInitial: true });
    });

    afterEach(() => {
      cy.clearUser({ deck: true });
    });

    it('it does not create a new local user on initial page load', () => {
      const luid = localStorage.getItem('luid');

      expect(luid).to.equal(mockUid);
    });

    it('it does not create a new user on server after first game has been played', () => {
      cy.savePlayerCount();

      cy.startNewGame({ waitInitial: true });

      cy.checkPlayerCount({ equal: true });
    });
  });
});
