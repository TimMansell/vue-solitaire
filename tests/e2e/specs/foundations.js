import moveAcetoAces from '../../fixtures/decks/moveAcetoAces.json';
import invalidMove2ToAces from '../../fixtures/decks/invalidMove2ToAces.json';

describe('Foundation moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should move As to 1st foundation', () => {
    cy.setDeck(moveAcetoAces).then(() => {
      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-As"]').should('be.visible');
      });

      cy.get('[data-test="card-As"]').click({ force: true });
      cy.get('[data-test="foundation-0"]').click();

      cy.get('[data-test="foundation-0"]').within(() => {
        cy.get('[data-test="card-As"]').should('be.visible');
      });

      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-As"]').should('be.not.visible');
      });
    });
  });

  it('should move As to 2nd foundation', () => {
    cy.setDeck(moveAcetoAces).then(() => {
      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-As"]').should('be.visible');
      });

      cy.get('[data-test="card-As"]').click({ force: true });
      cy.get('[data-test="foundation-1"]').click();

      cy.get('[data-test="foundation-1"]').within(() => {
        cy.get('[data-test="card-As"]').should('be.visible');
      });

      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-As"]').should('be.not.visible');
      });
    });
  });

  it('should move As to 3rd foundation', () => {
    cy.setDeck(moveAcetoAces).then(() => {
      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-As"]').should('be.visible');
      });

      cy.get('[data-test="card-As"]').click({ force: true });
      cy.get('[data-test="foundation-2"]').click();

      cy.get('[data-test="foundation-2"]').within(() => {
        cy.get('[data-test="card-As"]').should('be.visible');
      });

      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-As"]').should('be.not.visible');
      });
    });
  });

  it('should move As to 4th foundation', () => {
    cy.setDeck(moveAcetoAces).then(() => {
      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-As"]').should('be.visible');
      });

      cy.get('[data-test="card-As"]').click({ force: true });
      cy.get('[data-test="foundation-3"]').click();

      cy.get('[data-test="foundation-3"]').within(() => {
        cy.get('[data-test="card-As"]').should('be.visible');
      });

      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-As"]').should('be.not.visible');
      });
    });
  });

  it('should move Ah, 2h, A3 to 1st foundation', () => {
    cy.setDeck(moveAcetoAces).then(() => {
      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
        cy.get('[data-test="card-2h"]').should('be.visible');
      });

      cy.get('[data-test="card-Ah"]').click();
      cy.get('[data-test="foundation-0"]').click();

      cy.get('[data-test="card-2h"]').click();
      cy.get('[data-test="foundation-0"]').click();

      cy.get('[data-test="card-3h"]').click();
      cy.get('[data-test="foundation-0"]').click();

      cy.get('[data-test="foundation-0"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
        cy.get('[data-test="card-2h"]').should('be.visible');
        cy.get('[data-test="card-3h"]').should('be.visible');
      });

      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.not.visible');
        cy.get('[data-test="card-2h"]').should('be.not.visible');
        cy.get('[data-test="card-3h"]').should('be.not.visible');
      });
    });
  });

  it('should move Ah then 2h and As then 2s to 2nd & 4th foundation', () => {
    cy.setDeck(moveAcetoAces).then(() => {
      // Hearts
      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
        cy.get('[data-test="card-2h"]').should('be.visible');
      });

      cy.get('[data-test="card-Ah"]').click();
      cy.get('[data-test="foundation-1"]').click();

      cy.get('[data-test="card-2h"]').click();
      cy.get('[data-test="foundation-1"]').click();

      cy.get('[data-test="foundation-1"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
        cy.get('[data-test="card-2h"]').should('be.visible');
      });

      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.not.visible');
        cy.get('[data-test="card-2h"]').should('be.not.visible');
      });

      // Spades
      cy.get('[data-test="card-As"]').click();
      cy.get('[data-test="foundation-3"]').click();

      cy.get('[data-test="card-2s"]').click();
      cy.get('[data-test="foundation-3"]').click();

      cy.get('[data-test="foundation-3"]').within(() => {
        cy.get('[data-test="card-As"]').should('be.visible');
        cy.get('[data-test="card-2s"]').should('be.visible');
      });

      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-As"]').should('be.not.visible');
        cy.get('[data-test="card-2s"]').should('be.not.visible');
      });
    });
  });

  it('should move Ah to 1st foundation and not 2h', () => {
    cy.setDeck(invalidMove2ToAces).then(() => {
      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
      });

      cy.get('[data-test="card-Ah"]').click({ force: true });
      cy.get('[data-test="foundation-0"]').click();

      cy.get('[data-test="card-2h"]').click({ force: true });
      cy.get('[data-test="foundation-0"]').click();

      cy.get('[data-test="foundation-0"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
        cy.get('[data-test="card-2h"]').should('not.be.visible');
      });

      cy.get('[data-test="column-2"]').within(() => {
        cy.get('[data-test="card-2h"]').should('be.visible');
      });
    });
  });

  it('should move Ah to 1st foundation and not move 2c', () => {
    cy.setDeck(invalidMove2ToAces).then(() => {
      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
      });

      cy.get('[data-test="card-Ah"]').click();
      cy.get('[data-test="foundation-0"]').click();

      cy.get('[data-test="card-2c"]').click();
      cy.get('[data-test="foundation-0"]').click();

      cy.get('[data-test="foundation-0"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
        cy.get('[data-test="card-2c"]').should('not.be.visible');
      });

      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.not.visible');
      });
    });
  });

  it('should not move Ad to foundation', () => {
    cy.setDeck(invalidMove2ToAces).then(() => {
      cy.get('[data-test="column-1"]').within(() => {
        cy.get('[data-test="card-Ad"]').should('be.visible');
      });

      cy.get('[data-test="card-Ad"]').click({ force: true });
      cy.get('[data-test="foundation-0"]').click();

      cy.get('[data-test="column-1"]').within(() => {
        cy.get('[data-test="card-Ad"]').should('be.visible');
      });

      cy.get('[data-test="foundation-0"]').within(() => {
        cy.get('[data-test="card-Ad"]').should('be.not.visible');
      });
    });
  });
});
