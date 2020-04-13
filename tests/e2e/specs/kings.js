import moveKingToEmptyColumn from '../../fixtures/moveKingToEmptyColumn.json';
import invalidMove from '../../fixtures/invalidMove.json';

const setDeck = (deck) => {
  const getStore = () => cy.window().its('app.$store');

  getStore().then((store) => {
    store.dispatch('dealTestCards', deck);
  });
};

describe('Special King moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should move Kc to an empty column', () => {
    setDeck(moveKingToEmptyColumn);

    cy.get('[data-test="column-7"]').within(() => {
      cy.get('[data-test="card-Kc"]').should('be.visible');
    });

    cy.get('[data-test="card-Kc"]').click({ force: true });
    cy.get('[data-test="column-0"]').click();

    cy.get('[data-test="column-0"]').within(() => {
      cy.get('[data-test="card-Kc"]').should('be.visible');
    });

    cy.get('[data-test="column-7"]').within(() => {
      cy.get('[data-test="card-Kc"]').should('not.be.visible');
    });
  });

  // K to not empty
  it('should not move Ks to 9d', () => {
    setDeck(invalidMove);

    cy.get('[data-test="column-7"]').within(() => {
      cy.get('[data-test="card-Ks"]').should('be.visible');
    });

    cy.get('[data-test="card-Ks"]').click();
    cy.get('[data-test="card-9d"]').click();

    cy.get('[data-test="column-1"]').within(() => {
      cy.get('[data-test="card-Ks"]').should('not.be.visible');
    });
  });
});
