import numeral from 'numeral';

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
