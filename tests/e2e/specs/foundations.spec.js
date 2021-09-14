import moveAcetoAces from '../../fixtures/boards/moveAcetoAces.json';
import invalidMove2ToAces from '../../fixtures/boards/invalidMove2ToAces.json';
import foundations from '../../fixtures/boards/fullFoundation.json';
import doubleClickAce1 from '../../fixtures/boards/doubleClickAce1.json';
import doubleClickAce2 from '../../fixtures/boards/doubleClickAce2.json';

describe('Foundation moves', () => {
  beforeEach(() => {
    cy.visitApp();
  });

  afterEach(() => {
    cy.clearTest();
  });

  describe('using drag and drop', () => {
    it('should move A♠ to 1st foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['A♠']);

        cy.dragFromTo('card-A♠', 'foundation-0');

        cy.get('[data-test="foundation-0"]').shouldContain(['A♠']);

        cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
      });
    });

    it('should move A♠ to 2nd foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['A♠']);

        cy.dragFromTo('card-A♠', 'foundation-1');

        cy.get('[data-test="foundation-1"]').shouldContain(['A♠']);

        cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
      });
    });

    it('should move A♠ to 3rd foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['A♠']);

        cy.dragFromTo('card-A♠', 'foundation-2');

        cy.get('[data-test="foundation-2"]').shouldContain(['A♠']);

        cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
      });
    });

    it('should move A♠ to 4th foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['A♠']);

        cy.dragFromTo('card-A♠', 'foundation-3');

        cy.get('[data-test="foundation-3"]').shouldContain(['A♠']);

        cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
      });
    });

    it('should move A♥, 2♥, 3♥ to 1st foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['A♥', '3♥']);

        cy.dragFromTo('card-A♥', 'foundation-0');

        cy.dragFromTo('card-2♥', 'foundation-0');

        cy.dragFromTo('card-3♥', 'foundation-0');

        cy.get('[data-test="foundation-0"]').shouldContain(['A♥', '2♥', '3♥']);

        cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥', '3♥']);
      });
    });

    it('should move A♥ then 2♥ and A♠ then 2♠ to 2nd & 4th foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        // Hearts
        cy.get('[data-test="column-3"]').shouldContain(['A♥']);

        cy.dragFromTo('card-A♥', 'foundation-1');

        cy.dragFromTo('card-2♥', 'foundation-1');

        cy.get('[data-test="foundation-1"]').shouldContain(['A♥', '2♥']);

        cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥']);

        // Spades
        cy.dragFromTo('card-A♠', 'foundation-3');

        cy.dragFromTo('card-2♠', 'foundation-3');

        cy.get('[data-test="foundation-3"]').shouldContain(['A♠', '2♠']);

        cy.get('[data-test="column-7"]').shouldNotContain(['A♠', '2♠']);
      });
    });

    it('should move A♥ then 2♥ to 2nd foundation and not move A♠ to same foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        // Hearts
        cy.get('[data-test="column-3"]').shouldContain(['A♥']);

        cy.dragFromTo('card-A♥', 'foundation-1');
        cy.dragFromTo('card-2♥', 'foundation-1');

        cy.get('[data-test="foundation-1"]').shouldContain(['A♥', '2♥']);

        cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥']);

        // Spades
        cy.dragFromTo('card-A♠', 'foundation-1');

        cy.get('[data-test="foundation-1"]').shouldNotContain(['A♠']);

        cy.get('[data-test="column-7"]').shouldContain(['A♠']);
      });
    });

    it('should move A♥ to 1st foundation and not 2♥', () => {
      cy.setBoard(invalidMove2ToAces).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['A♥']);

        cy.dragFromTo('card-A♥', 'foundation-0');
        cy.dragFromTo('card-2♥', 'foundation-0');

        cy.get('[data-test="foundation-0"]').shouldContain(['A♥']);
        cy.get('[data-test="foundation-0"]').shouldNotContain(['2♥']);

        cy.get('[data-test="column-2"]').shouldContain(['2♥']);
      });
    });

    it('should move A♥ to 1st foundation and not move 2♣', () => {
      cy.setBoard(invalidMove2ToAces).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['A♥']);

        cy.dragFromTo('card-A♥', 'foundation-0');

        cy.dragFromTo('card-2♣', 'foundation-0');

        cy.get('[data-test="foundation-0"]').shouldContain(['A♥']);
        cy.get('[data-test="foundation-0"]').shouldNotContain(['2♣']);

        cy.get('[data-test="column-3"]').shouldNotContain(['A♥']);
      });
    });

    it('should not move A♦ to foundation', () => {
      cy.setBoard(invalidMove2ToAces).then(() => {
        cy.get('[data-test="column-1"]').shouldContain(['A♦']);

        cy.dragFromTo('card-A♦', 'foundation-0');

        cy.get('[data-test="column-1"]').shouldContain(['A♦']);

        cy.get('[data-test="foundation-0"]').shouldNotContain(['A♦']);
      });
    });

    it('should move last cards foundation and then show win screen', () => {
      cy.setBoard(foundations).then(() => {
        cy.get('[data-test="game-won"]').should('not.exist');

        cy.get('[data-test="column-0"]').shouldContain(['K♠', 'Q♠']);

        cy.dragFromTo('card-Q♠', 'foundation-3');
        cy.dragFromTo('card-K♠', 'foundation-3');

        cy.get('[data-test="game-won"]').should('be.visible');

        cy.checkGameSummaryValues({ moves: 2 });
      });
    });

    it('it should start a new game and reset board', () => {
      cy.setBoard(foundations).then(() => {
        cy.get('[data-test="column-0"]').shouldContain(['K♠', 'Q♠']);

        cy.dragFromTo('card-Q♠', 'foundation-3');
        cy.dragFromTo('card-K♠', 'foundation-3');

        cy.get(
          '[data-test="game-overlay-btns"] [data-test="new-game-btn"]'
        ).click();

        cy.wait('@waitForNewGameAPI');

        cy.get('[data-test="game-won"]').should('not.exist');

        cy.get('[data-test="foundation-3"]').shouldNotContain(['K♠', 'Q♠']);
      });
    });
  });

  describe('using clicks', () => {
    it('should move A♠ to 1st foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['A♠']);

        cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="foundation-0"]').shouldContain(['A♠']);

        cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
      });
    });

    it('should move A♠ to 2nd foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['A♠']);

        cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-1"]');

        cy.get('[data-test="foundation-1"]').shouldContain(['A♠']);

        cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
      });
    });

    it('should move A♠ to 3rd foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['A♠']);

        cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-2"]');

        cy.get('[data-test="foundation-2"]').shouldContain(['A♠']);

        cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
      });
    });

    it('should move A♠ to 4th foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        cy.get('[data-test="column-7"]').shouldContain(['A♠']);

        cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-3"]');

        cy.get('[data-test="foundation-3"]').shouldContain(['A♠']);

        cy.get('[data-test="column-7"]').shouldNotContain(['A♠']);
      });
    });

    it('should move A♥, 2♥, 3♥ to 1st foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['A♥']);

        cy.get('[data-test="card-A♥"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="card-2♥"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="card-3♥"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="foundation-0"]').shouldContain(['A♥', '2♥', '3♥']);

        cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥', '3♥']);
      });
    });

    it('should move A♥ then 2♥ and A♠ then 2♠ to 2nd & 4th foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        // Hearts
        cy.get('[data-test="column-3"]').shouldContain(['A♥']);

        cy.get('[data-test="card-A♥"]').clickTo('[data-test="foundation-1"]');

        cy.get('[data-test="card-2♥"]').clickTo('[data-test="foundation-1"]');

        cy.get('[data-test="foundation-1"]').shouldContain(['A♥', '2♥']);

        cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥']);

        // Spades
        cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-3"]');

        cy.get('[data-test="card-2♠"]').clickTo('[data-test="foundation-3"]');

        cy.get('[data-test="foundation-3"]').shouldContain(['A♠', '2♠']);

        cy.get('[data-test="column-7"]').shouldNotContain(['A♠', '2♠']);
      });
    });

    it('should move A♥ then 2♥ to 2nd foundation and not move A♠ to same foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        // Hearts
        cy.get('[data-test="column-3"]').shouldContain(['A♥']);

        cy.get('[data-test="card-A♥"]').clickTo('[data-test="foundation-1"]');
        cy.get('[data-test="card-2♥"]').clickTo('[data-test="foundation-1"]');

        cy.get('[data-test="foundation-1"]').shouldContain(['A♥', '2♥']);

        cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥']);

        // Spades
        cy.get('[data-test="card-A♠"]').clickTo('[data-test="foundation-1"]');
        // cy.get('[data-test="card-2♠"]').clickTo('[data-test="foundation-1"]');

        cy.get('[data-test="foundation-1"]').shouldNotContain(['A♠']);

        cy.get('[data-test="column-7"]').shouldContain(['A♠']);
      });
    });

    it('should move A♥ to 1st foundation and not 2♥', () => {
      cy.setBoard(invalidMove2ToAces).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['A♥']);

        cy.get('[data-test="card-A♥"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="card-2♥"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="foundation-0"]').shouldContain(['A♥']);
        cy.get('[data-test="foundation-0"]').shouldNotContain(['2♥']);

        cy.get('[data-test="column-2"]').shouldContain(['2♥']);
      });
    });

    it('should move A♥ to 1st foundation and not move 2♣', () => {
      cy.setBoard(invalidMove2ToAces).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['A♥']);

        cy.get('[data-test="card-A♥"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="card-2♣"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="foundation-0"]').shouldContain(['A♥']);
        cy.get('[data-test="foundation-0"]').shouldNotContain(['2♣']);

        cy.get('[data-test="column-3"]').shouldNotContain(['A♥']);
      });
    });

    it('should not move A♦ to foundation', () => {
      cy.setBoard(invalidMove2ToAces).then(() => {
        cy.get('[data-test="column-1"]').shouldContain(['A♦']);

        cy.get('[data-test="card-A♦"]').clickTo('[data-test="foundation-0"]');

        cy.get('[data-test="column-1"]').shouldContain(['A♦']);

        cy.get('[data-test="foundation-0"]').shouldNotContain(['A♦']);
      });
    });

    it('should move last cards foundation and then show win screen', () => {
      cy.setBoard(foundations).then(() => {
        cy.get('[data-test="game-won"]').should('not.exist');

        cy.get('[data-test="column-0"]').shouldContain(['K♠', 'Q♠']);

        cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');
        cy.get('[data-test="card-K♠"]').clickTo('[data-test="foundation-3"]');

        cy.get('[data-test="game-won"]').should('be.visible');

        cy.checkGameSummaryValues({ moves: 2 });
      });

      cy.get('[data-test="game-overlay-btns"]').click();

      cy.get('[data-test="game-won"]').should('not.exist');

      cy.get('[data-test="foundation-3"]').shouldNotContain(['K♠', 'Q♠']);
    });

    it('it should start a new game and reset board', () => {
      cy.setBoard(foundations).then(() => {
        cy.get('[data-test="column-0"]').shouldContain(['K♠', 'Q♠']);

        cy.get('[data-test="card-Q♠"]').clickTo('[data-test="foundation-3"]');
        cy.get('[data-test="card-K♠"]').clickTo('[data-test="foundation-3"]');

        cy.get(
          '[data-test="game-overlay-btns"] [data-test="new-game-btn"]'
        ).click();

        cy.wait('@waitForNewGameAPI');

        cy.get('[data-test="game-won"]').should('not.exist');

        cy.get('[data-test="foundation-3"]').shouldNotContain(['K♠', 'Q♠']);
      });
    });
  });

  describe('using double clicks', () => {
    it('should move A♥ - 3♥ to 1st foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['A♥', '3♥']);

        cy.get('[data-test="card-A♥"]').dblclick();
        cy.get('[data-test="card-2♥"]').dblclick();
        cy.get('[data-test="card-3♥"]').dblclick();

        cy.get('[data-test="foundation-0"]').shouldContain(['A♥', '2♥', '3♥']);

        cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥', '3♥']);
      });
    });

    it('should move A♥ - 2♥ to 1st foundation and A♠ - 2♠ to 2nd foundation', () => {
      cy.setBoard(moveAcetoAces).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['A♥']);
        cy.get('[data-test="column-7"]').shouldContain(['A♠']);

        cy.get('[data-test="card-A♥"]').dblclick();
        cy.get('[data-test="card-A♠"]').dblclick();
        cy.get('[data-test="card-2♥"]').dblclick();
        cy.get('[data-test="card-2♠"]').dblclick();

        cy.get('[data-test="foundation-0"]').shouldContain(['A♥', '2♥']);
        cy.get('[data-test="foundation-1"]').shouldContain(['A♠', '2♠']);

        cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥']);
        cy.get('[data-test="column-7"]').shouldNotContain(['A♠', '2♠']);
      });
    });

    it('should move A♥ - 2♥ to 1st foundation and 2♠ to 3rd foundation', () => {
      cy.setBoard(doubleClickAce1).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['A♥']);
        cy.get('[data-test="column-7"]').shouldContain(['2♠']);

        cy.get('[data-test="card-A♥"]').dblclick();
        cy.get('[data-test="card-2♥"]').dblclick();
        cy.get('[data-test="card-2♠"]').dblclick();

        cy.get('[data-test="foundation-0"]').shouldContain(['A♥', '2♥']);
        cy.get('[data-test="foundation-2"]').shouldContain(['A♠', '2♠']);

        cy.get('[data-test="column-3"]').shouldNotContain(['A♥', '2♥']);
        cy.get('[data-test="column-7"]').shouldNotContain(['2♠']);
      });
    });

    it('should move 2♥ to 2nd foundation and 2♠ to 3rd foundation', () => {
      cy.setBoard(doubleClickAce2).then(() => {
        cy.get('[data-test="column-3"]').shouldContain(['2♥']);
        cy.get('[data-test="column-7"]').shouldContain(['2♠']);

        cy.get('[data-test="card-2♥"]').dblclick();
        cy.get('[data-test="card-2♠"]').dblclick();

        cy.get('[data-test="foundation-1"]').shouldContain(['A♠', '2♠']);
        cy.get('[data-test="foundation-2"]').shouldContain(['A♥', '2♥']);

        cy.get('[data-test="column-3"]').shouldNotContain(['2♥']);
        cy.get('[data-test="column-7"]').shouldNotContain(['2♠']);
      });
    });
  });
});
