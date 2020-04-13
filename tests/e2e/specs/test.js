import moveAcetoAces from '../../fixtures/moveAcetoAces.json';
import invalidMove2ToAces from '../../fixtures/invalidMove2ToAces.json';
import moveKingToEmptyColumn from '../../fixtures/moveKingToEmptyColumn.json';
import validMove from '../../fixtures/validMove.json';
import invalidMove from '../../fixtures/invalidMove.json';
import moveQueenToSameColumn from '../../fixtures/moveQueenToSameColumn.json';

const setDeck = (deck) => {
  const getStore = () => cy.window().its('app.$store');

  getStore().then((store) => {
    store.dispatch('dealTestCards', deck);
  });
};

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('App successfullly loads', () => {
    cy.get('[data-test="board"]').should('be.visible');
  });

  // valid move
  describe('Valid moves', () => {
    it('should move 6d to 7d and 9d to 10d', () => {
      setDeck(validMove);

      // Test card from middle.
      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-6d"]').should('be.visible');
      });

      cy.get('[data-test="card-6d"]').click();
      cy.get('[data-test="card-7d"]').click();

      cy.get('[data-test="column-2"]').within(() => {
        cy.get('[data-test="card-6d"]').should('be.visible');
      });

      // Test card from bottom.
      cy.get('[data-test="column-1"]').within(() => {
        cy.get('[data-test="card-9d"]').should('be.visible');
      });

      cy.get('[data-test="card-9d"]').click();
      cy.get('[data-test="card-10d"]').click();

      cy.get('[data-test="column-6"]').within(() => {
        cy.get('[data-test="card-9d"]').should('be.visible');
      });
    });
  });

  describe('Special Ace moves', () => {
    it('should move Ah then 2h to its save box', () => {
      setDeck(moveAcetoAces);

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

    it('should move Ah and not 2h to its save box', () => {
      setDeck(invalidMove2ToAces);

      cy.get('[data-test="column-3"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
      });

      cy.get('[data-test="card-Ah"]').click();
      cy.get('[data-test="ace"]').click();

      cy.get('[data-test="card-2h"]').click();
      cy.get('[data-test="ace"]').click();

      cy.get('[data-test="ace-h"]').within(() => {
        cy.get('[data-test="card-Ah"]').should('be.visible');
        cy.get('[data-test="card-2h"]').should('not.be.visible');
      });

      cy.get('[data-test="column-2"]').within(() => {
        cy.get('[data-test="card-2h"]').should('be.visible');
      });
    });

    it('should move Ah then not move 2c to its save box', () => {
      setDeck(invalidMove2ToAces);

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

  describe('Special King moves', () => {
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

  describe('Invalid moves', () => {
    // invalid value, invalid suit
    it('should not move 6s to 4d and 5s to 10d', () => {
      setDeck(invalidMove);

      // Test card from middle.
      cy.get('[data-test="column-4"]').within(() => {
        cy.get('[data-test="card-6s"]').should('be.visible');
      });

      cy.get('[data-test="card-6s"]').click();
      cy.get('[data-test="card-4d"]').click();

      cy.get('[data-test="column-5"]').within(() => {
        cy.get('[data-test="card-6s"]').should('not.be.visible');
      });

      // Test card from bottom.
      cy.get('[data-test="column-0"]').within(() => {
        cy.get('[data-test="card-5s"]').should('be.visible');
      });

      cy.get('[data-test="card-5s"]').click();
      cy.get('[data-test="card-10d"]').click();

      cy.get('[data-test="column-6"]').within(() => {
        cy.get('[data-test="card-5s"]').should('not.be.visible');
      });
    });

    // valid value, wrong suit
    it('should not move 4d to 5s', () => {
      setDeck(invalidMove);

      cy.get('[data-test="column-5"]').within(() => {
        cy.get('[data-test="card-4d"]').should('be.visible');
      });

      cy.get('[data-test="card-4d"]').click();
      cy.get('[data-test="card-5s"]').click();

      cy.get('[data-test="column-0"]').within(() => {
        cy.get('[data-test="card-4d"]').should('not.be.visible');
      });
    });

    // valid suit, wrong value
    it('should not move 7d to 9d', () => {
      setDeck(invalidMove);

      cy.get('[data-test="column-2"]').within(() => {
        cy.get('[data-test="card-7d"]').should('be.visible');
      });

      cy.get('[data-test="card-7d"]').click();
      cy.get('[data-test="card-9d"]').click();

      cy.get('[data-test="column-1"]').within(() => {
        cy.get('[data-test="card-7d"]').should('not.be.visible');
      });
    });

    // valid card, same column
    it('should not move Qs to Ks on the same column', () => {
      setDeck(moveQueenToSameColumn);

      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test="card-Qs"]').should('be.visible');
      });

      cy.get('[data-test="card-Qs"]').click({ force: true });
      cy.get('[data-test="card-Ks"]').click();

      cy.get('[data-test="column-7"]').within(() => {
        cy.get('[data-test*="card-"]').eq(1).should('contain', 'Qs');
      });
    });
  });
});
