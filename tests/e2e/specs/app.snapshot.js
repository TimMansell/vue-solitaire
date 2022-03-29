import quitGameDeck from '../../fixtures/decks/quitGame.json';
import quitGameMoves from '../../fixtures/moves/quitGame.json';

const sizes = [
  'iphone-5',
  'iphone-6',
  'iphone-xr',
  'ipad-2',
  ['ipad-2', 'landscape'],
  'macbook-11',
  'macbook-15',
  [1920, 1080],
  [2560, 1440],
];

describe('App', () => {
  sizes.forEach((size) => {
    it(`matches ${size} snapshot`, () => {
      cy.visitApp();

      cy.mockBoard(quitGameDeck);

      cy.runGameWithClicks(quitGameMoves);

      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);

        cy.matchImageSnapshot(size.join());
      } else {
        cy.viewport(size);

        cy.matchImageSnapshot(size);
      }
    });
  });
});
