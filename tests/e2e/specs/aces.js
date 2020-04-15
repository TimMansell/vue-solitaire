import moveAcetoAces from '../../fixtures/decks/moveAcetoAces.json';
import invalidMove2ToAces from '../../fixtures/decks/invalidMove2ToAces.json';

describe('Special Ace moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should move Ah then 2h to its save box', () => {
    cy.setDeck(moveAcetoAces).then(() => {
      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
        cy.get('[data-test="card-2h"]').should('be.visible');
      });

      cy.get('[data-test="card-Ah"]').click();
      cy.get('[data-test="ace"]').click();

      cy.get('[data-test="card-2h"]').click();
      cy.get('[data-test="ace"]').click();

      cy.get('[data-test="ace-h"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
        cy.get('[data-test="card-2h"]').should('be.visible');
      });

      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.not.visible');
        cy.get('[data-test="card-2h"]').should('be.not.visible');
      });
    });
  });

  it('should move Ah and not 2h to its save box', () => {
    cy.setDeck(invalidMove2ToAces).then(() => {
      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
      });

      cy.get('[data-test="card-Ah"]').click({ force: true });
      cy.get('[data-test="ace"]').click();

      cy.get('[data-test="card-2h"]').click({ force: true });
      cy.get('[data-test="ace"]').click();

      cy.get('[data-test="ace-h"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
        cy.get('[data-test="card-2h"]').should('not.be.visible');
      });

      cy.get('[data-test="column-2"]').within(() => {
        cy.get('[data-test="card-2h"]').should('be.visible');
      });
    });
  });

  it('should move Ah then not move 2c to its save box', () => {
    cy.setDeck(invalidMove2ToAces).then(() => {
      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
      });

      cy.get('[data-test="card-Ah"]').click();
      cy.get('[data-test="ace"]').click();

      cy.get('[data-test="card-2c"]').click();
      cy.get('[data-test="ace"]').click();

      cy.get('[data-test="ace-h"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
        cy.get('[data-test="card-2c"]').should('not.be.visible');
      });

      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.not.visible');
      });
    });
  });

  it('should not move Ad to its save box', () => {
    cy.setDeck(invalidMove2ToAces).then(() => {
      cy.get('[data-test="column-1"]').within(() => {
        cy.get('[data-test="card-Ad"]').should('be.visible');
      });

      cy.get('[data-test="card-Ad"]').click({ force: true });
      cy.get('[data-test="ace"]').click();

      cy.get('[data-test="ace-d"]').within(() => {
        cy.get('[data-test="card-Ad"]').should('not.be.visible');
      });

      cy.get('[data-test="column-1"]').within(() => {
        cy.get('[data-test="card-Ad"]').should('be.visible');
      });
    });
  });
});
