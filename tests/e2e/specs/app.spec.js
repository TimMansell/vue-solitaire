describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('it successfullly loads', () => {
    cy.get('[data-test="board"]').should('be.visible');
  });

  it("timer doesn't start untill visibilitychange is triggered", () => {
    cy.get('[data-test="timer"]').then(($timerStart) => {
      const startNumber = $timerStart.text();

      cy.wait(2000);

      cy.document().trigger('visibilitychange');

      cy.get('[data-test="timer"]').then(($timerEnd) => {
        const endNumber = $timerEnd.text();

        expect(startNumber).to.equal(endNumber);
      });
    });
  });
});
