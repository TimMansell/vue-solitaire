Cypress.Commands.add(
  'shouldContain',
  { prevSubject: true },
  (subject, elements) => {
    cy.get(subject).within(() => {
      elements.forEach((element) => {
        cy.get(`[data-test="card-${element}"]`).should('be.visible');
      });
    });
  }
);

Cypress.Commands.add(
  'shouldNotContain',
  { prevSubject: true },
  (subject, elements) => {
    cy.get(subject).within(() => {
      elements.forEach((element) => {
        cy.get(`[data-test="card-${element}"]`).should('not.exist');
      });
    });
  }
);

Cypress.Commands.add('reloadAndWait', () => {
  cy.reload();

  cy.wait('@waitForInitialDataAPI');
});

Cypress.Commands.add('saveTextAs', { prevSubject: true }, (subject, alias) => {
  cy.get(subject)
    .then(($value) => $value.text())
    .then(($value) => cy.wrap($value).as(alias));
});

Cypress.Commands.add(
  'saveNumberAs',
  { prevSubject: true },
  (subject, alias) => {
    cy.get(subject)
      .then(($value) => parseInt($value.text(), 10))
      .then(($value) => cy.wrap($value).as(alias));
  }
);
