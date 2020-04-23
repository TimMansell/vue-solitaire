import moveAcetoAces from '../../fixtures/decks/moveAcetoAces.json';
import invalidMove2ToAces from '../../fixtures/decks/invalidMove2ToAces.json';
import foundations from '../../fixtures/foundations/fullFoundation.json';

describe('Foundation moves', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('using drag and drop', () => {
    it('should move As to 1st foundation', () => {
      cy.setDeck(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldBeVisible(['As']);

        cy.get('[data-test="card-As"]').dragTo('[data-test="foundation-0"]');

        cy.get('[data-test="foundation-0"]').shouldBeVisible(['As']);

        cy.get('[data-test="column-7"]').shouldNotBeVisible(['As']);
      });
    });

    it('should move As to 2nd foundation', () => {
      cy.setDeck(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldBeVisible(['As']);

        cy.get('[data-test="card-As"]').dragTo('[data-test="foundation-1"]');

        cy.get('[data-test="foundation-1"]').shouldBeVisible(['As']);

        cy.get('[data-test="column-7"]').shouldNotBeVisible(['As']);
      });
    });

    it('should move As to 3rd foundation', () => {
      cy.setDeck(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldBeVisible(['As']);

        cy.get('[data-test="card-As"]').dragTo('[data-test="foundation-2"]');

        cy.get('[data-test="foundation-2"]').shouldBeVisible(['As']);

        cy.get('[data-test="column-7"]').shouldNotBeVisible(['As']);
      });
    });

    it('should move As to 4th foundation', () => {
      cy.setDeck(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldBeVisible(['As']);

        cy.get('[data-test="card-As"]').dragTo('[data-test="foundation-3"]');

        cy.get('[data-test="foundation-3"]').shouldBeVisible(['As']);

        cy.get('[data-test="column-7"]').shouldNotBeVisible(['As']);
      });
    });

    it('should move Ah, 2h, A3 to 1st foundation', () => {
      cy.setDeck(moveAcetoAces).then(() => {
        cy.get('[data-test="column-3"]').shouldBeVisible(['Ah', '2h']);

        cy.get('[data-test="card-Ah"]').dragTo('[data-test="foundation-0"]');

        cy.get('[data-test="card-2h"]').dragTo('[data-test="foundation-0"]');

        cy.get('[data-test="card-3h"]').dragTo('[data-test="foundation-0"]');

        cy.get('[data-test="foundation-0"]').shouldBeVisible(['Ah', '2h', '3h']);

        cy.get('[data-test="column-3"]').shouldNotBeVisible(['Ah', '2h', '3h']);
      });
    });

    it('should move Ah then 2h and As then 2s to 2nd & 4th foundation', () => {
      cy.setDeck(moveAcetoAces).then(() => {
        // Hearts
        cy.get('[data-test="column-3"]').shouldBeVisible(['Ah', '2h']);

        cy.get('[data-test="card-Ah"]').dragTo('[data-test="foundation-1"]');

        cy.get('[data-test="card-2h"]').dragTo('[data-test="foundation-1"]');

        cy.get('[data-test="foundation-1"]').shouldBeVisible(['Ah', '2h']);

        cy.get('[data-test="column-3"]').shouldNotBeVisible(['Ah', '2h']);

        // Spades
        cy.get('[data-test="card-As"]').dragTo('[data-test="foundation-3"]');

        cy.get('[data-test="card-2s"]').dragTo('[data-test="foundation-3"]');

        cy.get('[data-test="foundation-3"]').shouldBeVisible(['As', '2s']);

        cy.get('[data-test="column-7"]').shouldNotBeVisible(['As', '2s']);
      });
    });

    it('should move Ah then 2h to 2nd foundation and not move As & 2s to same foundation', () => {
      cy.setDeck(moveAcetoAces).then(() => {
        // Hearts
        cy.get('[data-test="column-3"]').shouldBeVisible(['Ah', '2h']);

        cy.get('[data-test="card-Ah"]').dragTo('[data-test="foundation-1"]');
        cy.get('[data-test="card-2h"]').dragTo('[data-test="foundation-1"]');

        cy.get('[data-test="foundation-1"]').shouldBeVisible(['Ah', '2h']);

        cy.get('[data-test="column-3"]').shouldNotBeVisible(['Ah', '2h']);

        // Spades
        cy.get('[data-test="card-As"]').dragTo('[data-test="foundation-1"]');
        cy.get('[data-test="card-2s"]').dragTo('[data-test="foundation-1"]');

        cy.get('[data-test="foundation-1"]').shouldNotBeVisible(['As', '2s']);

        cy.get('[data-test="column-7"]').shouldBeVisible(['As', '2s']);
      });
    });

    it('should move Ah to 1st foundation and not 2h', () => {
      cy.setDeck(invalidMove2ToAces).then(() => {
        cy.get('[data-test="column-3"]').shouldBeVisible(['Ah']);

        cy.get('[data-test="card-Ah"]').dragTo('[data-test="foundation-0"]');

        cy.get('[data-test="card-2h"]').dragTo('[data-test="foundation-0"]');

        cy.get('[data-test="foundation-0"]').shouldBeVisible(['Ah']);
        cy.get('[data-test="foundation-0"]').shouldNotBeVisible(['2h']);

        cy.get('[data-test="column-2"]').shouldBeVisible(['2h']);
      });
    });

    it('should move Ah to 1st foundation and not move 2c', () => {
      cy.setDeck(invalidMove2ToAces).then(() => {
        cy.get('[data-test="column-3"]').shouldBeVisible(['Ah']);

        cy.get('[data-test="card-Ah"]').dragTo('[data-test="foundation-0"]');

        cy.get('[data-test="card-2c"]').dragTo('[data-test="foundation-0"]');

        cy.get('[data-test="foundation-0"]').shouldBeVisible(['Ah']);
        cy.get('[data-test="foundation-0"]').shouldNotBeVisible(['2c']);

        cy.get('[data-test="column-3"]').shouldNotBeVisible(['Ah']);
      });
    });

    it('should not move Ad to foundation', () => {
      cy.setDeck(invalidMove2ToAces).then(() => {
        cy.get('[data-test="column-1"]').shouldBeVisible(['Ad']);

        cy.get('[data-test="card-Ad"]').dragTo('[data-test="foundation-0"]');

        cy.get('[data-test="column-1"]').shouldBeVisible(['Ad']);

        cy.get('[data-test="foundation-0"]').shouldNotBeVisible(['Ad']);
      });
    });

    it('should move last cards foundation and then show win screen', () => {
      cy.setBoard(foundations).then(() => {
        cy.get('[data-test="winner"]').should('not.be.visible');

        cy.get('[data-test="column-0"]').shouldBeVisible(['Ks', 'Qs']);

        cy.get('[data-test="card-Qs"]').dragTo('[data-test="foundation-3"]');
        cy.get('[data-test="card-Ks"]').dragTo('[data-test="foundation-3"]');
      });

      cy.get('[data-test="winner"]').should('be.visible');
    });
  });

  describe('using clicks', () => {
    it('should move As to 1st foundation', () => {
      cy.setDeck(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldBeVisible(['As']);

        cy.get('[data-test="card-As"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="foundation-0"]').shouldBeVisible(['As']);

        cy.get('[data-test="column-7"]').shouldNotBeVisible(['As']);
      });
    });

    it('should move As to 2nd foundation', () => {
      cy.setDeck(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldBeVisible(['As']);

        cy.get('[data-test="card-As"]').clickTo('[data-test="foundation-1"]');

        cy.get('[data-test="foundation-1"]').shouldBeVisible(['As']);

        cy.get('[data-test="column-7"]').shouldNotBeVisible(['As']);
      });
    });

    it('should move As to 3rd foundation', () => {
      cy.setDeck(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldBeVisible(['As']);

        cy.get('[data-test="card-As"]').clickTo('[data-test="foundation-2"]');

        cy.get('[data-test="foundation-2"]').shouldBeVisible(['As']);

        cy.get('[data-test="column-7"]').shouldNotBeVisible(['As']);
      });
    });

    it('should move As to 4th foundation', () => {
      cy.setDeck(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldBeVisible(['As']);

        cy.get('[data-test="card-As"]').clickTo('[data-test="foundation-3"]');

        cy.get('[data-test="foundation-3"]').shouldBeVisible(['As']);

        cy.get('[data-test="column-7"]').shouldNotBeVisible(['As']);
      });
    });

    it('should move Ah, 2h, A3 to 1st foundation', () => {
      cy.setDeck(moveAcetoAces).then(() => {
        cy.get('[data-test="column-3"]').shouldBeVisible(['Ah', '2h']);

        cy.get('[data-test="card-Ah"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="card-2h"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="card-3h"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="foundation-0"]').shouldBeVisible(['Ah', '2h', '3h']);

        cy.get('[data-test="column-3"]').shouldNotBeVisible(['Ah', '2h', '3h']);
      });
    });

    it('should move Ah then 2h and As then 2s to 2nd & 4th foundation', () => {
      cy.setDeck(moveAcetoAces).then(() => {
        // Hearts
        cy.get('[data-test="column-3"]').shouldBeVisible(['Ah', '2h']);

        cy.get('[data-test="card-Ah"]').clickTo('[data-test="foundation-1"]');

        cy.get('[data-test="card-2h"]').clickTo('[data-test="foundation-1"]');

        cy.get('[data-test="foundation-1"]').shouldBeVisible(['Ah', '2h']);

        cy.get('[data-test="column-3"]').shouldNotBeVisible(['Ah', '2h']);

        // Spades
        cy.get('[data-test="card-As"]').clickTo('[data-test="foundation-3"]');

        cy.get('[data-test="card-2s"]').clickTo('[data-test="foundation-3"]');

        cy.get('[data-test="foundation-3"]').shouldBeVisible(['As', '2s']);

        cy.get('[data-test="column-7"]').shouldNotBeVisible(['As', '2s']);
      });
    });

    it('should move Ah then 2h to 2nd foundation and not move As & 2s to same foundation', () => {
      cy.setDeck(moveAcetoAces).then(() => {
        // Hearts
        cy.get('[data-test="column-3"]').shouldBeVisible(['Ah', '2h']);

        cy.get('[data-test="card-Ah"]').clickTo('[data-test="foundation-1"]');
        cy.get('[data-test="card-2h"]').clickTo('[data-test="foundation-1"]');

        cy.get('[data-test="foundation-1"]').shouldBeVisible(['Ah', '2h']);

        cy.get('[data-test="column-3"]').shouldNotBeVisible(['Ah', '2h']);

        // Spades
        cy.get('[data-test="card-As"]').clickTo('[data-test="foundation-1"]');
        cy.get('[data-test="card-2s"]').clickTo('[data-test="foundation-1"]');

        cy.get('[data-test="foundation-1"]').shouldNotBeVisible(['As', '2s']);

        cy.get('[data-test="column-7"]').shouldBeVisible(['As', '2s']);
      });
    });

    it('should move Ah to 1st foundation and not 2h', () => {
      cy.setDeck(invalidMove2ToAces).then(() => {
        cy.get('[data-test="column-3"]').shouldBeVisible(['Ah']);

        cy.get('[data-test="card-Ah"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="card-2h"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="foundation-0"]').shouldBeVisible(['Ah']);
        cy.get('[data-test="foundation-0"]').shouldNotBeVisible(['2h']);

        cy.get('[data-test="column-2"]').shouldBeVisible(['2h']);
      });
    });

    it('should move Ah to 1st foundation and not move 2c', () => {
      cy.setDeck(invalidMove2ToAces).then(() => {
        cy.get('[data-test="column-3"]').shouldBeVisible(['Ah']);

        cy.get('[data-test="card-Ah"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="card-2c"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="foundation-0"]').shouldBeVisible(['Ah']);
        cy.get('[data-test="foundation-0"]').shouldNotBeVisible(['2c']);

        cy.get('[data-test="column-3"]').shouldNotBeVisible(['Ah']);
      });
    });

    it('should not move Ad to foundation', () => {
      cy.setDeck(invalidMove2ToAces).then(() => {
        cy.get('[data-test="column-1"]').shouldBeVisible(['Ad']);

        cy.get('[data-test="card-Ad"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="column-1"]').shouldBeVisible(['Ad']);

        cy.get('[data-test="foundation-0"]').shouldNotBeVisible(['Ad']);
      });
    });

    it('should move last cards foundation and then show win screen', () => {
      cy.setBoard(foundations).then(() => {
        cy.get('[data-test="winner"]').should('not.be.visible');

        cy.get('[data-test="column-0"]').shouldBeVisible(['Ks', 'Qs']);

        cy.get('[data-test="card-Qs"]').clickTo('[data-test="foundation-3"]');
        cy.get('[data-test="card-Ks"]').clickTo('[data-test="foundation-3"]');
      });

      cy.get('[data-test="winner"]').should('be.visible');
    });
  });
});
