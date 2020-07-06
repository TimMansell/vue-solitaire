import doubleClickAce2 from '../../fixtures/boards/doubleClickAce2.json';

const url = '/';

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
      cy.visit(url);

      cy.setBoard(doubleClickAce2).then(() => {
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
});
