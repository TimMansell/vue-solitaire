describe('Leaderboards', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should not show game paused if leaderboards overlay is visible', () => {
    cy.document().then((doc) => {
      cy.stub(doc, 'visibilityState').value('hidden');
    });

    cy.get('[data-test="leaderboards-btn"]').click();

    cy.document().trigger('visibilitychange');

    cy.get('[data-test="game-paused"]').should('not.exist');
  });

  it('it should display correct heading', () => {
    cy.get('[data-test="leaderboards-btn"]').click();

    cy.get('[data-test="leaderboards-heading"]')
      .as('heading')
      .should('contain', 'Top 25 Best Moves');

    cy.get('[data-test="leaderboard-set-best"] [data-test="select"]').select(
      'Times'
    );

    cy.get('@heading').should('contain', 'Top 25 Best Times');

    cy.get('[data-test="leaderboard-set-top"] [data-test="select"]').select(
      '50'
    );

    cy.get('@heading').should('contain', 'Top 50 Best Times');
  });

  it('it should display correct amount of table rows', () => {
    cy.get('[data-test="leaderboards-btn"]').click();

    cy.get('[data-test="table-row"]').should('have.length', 25);

    cy.get('[data-test="leaderboard-set-top"] [data-test="select"]').select(
      '50'
    );

    cy.get('[data-test="table-row"]').should('have.length', 50);
  });

  it('it should display correct table heading', () => {
    cy.get('[data-test="leaderboards-btn"]').click();

    cy.get('[data-test="table-header-row"] th')
      .eq(3)
      .as('row')
      .should('contain', 'Moves');

    cy.get('[data-test="leaderboard-set-best"] [data-test="select"]').select(
      'Times'
    );

    cy.get('@row').should('contain', 'Times');
  });
});
