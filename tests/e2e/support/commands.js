import numeral from 'numeral';

Cypress.Commands.add(
  'shouldExist',
  { prevSubject: true },
  (subject, elements) => {
    cy.get(subject).within(() => {
      elements.forEach((element) => {
        cy.get(`[data-test="card-${element}"]`).should('exist');
      });
    });
  }
);

Cypress.Commands.add(
  'shouldNotExist',
  { prevSubject: true },
  (subject, elements) => {
    cy.get(subject).within(() => {
      elements.forEach((element) => {
        cy.get(`[data-test="card-${element}"]`).should('not.exist');
      });
    });
  }
);

Cypress.Commands.add(
  'shouldBeVisible',
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
  'shouldNotBeVisible',
  { prevSubject: true },
  (subject, elements) => {
    cy.get(subject).within(() => {
      elements.forEach((element) => {
        cy.get(`[data-test="card-${element}"]`).should('not.be.visible');
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
      .then(($value) => numeral($value.text()).value())
      .then(($value) => cy.wrap($value).as(alias));
  }
);

Cypress.Commands.add('saveDataAs', { prevSubject: true }, (subject, alias) => {
  cy.get(subject)
    .then(($value) => $value.attr(`data-${alias}`))
    .then(($value) => cy.wrap($value).as(alias));
});

Cypress.Commands.add('formatNumber', { prevSubject: true }, (subject) => {
  cy.get(subject).then(($value) => numeral($value.text()).value());
});

Cypress.Commands.add('getData', { prevSubject: true }, (subject, alias) => {
  cy.get(subject).then(($value) => $value.attr(`data-${alias}`));
});
