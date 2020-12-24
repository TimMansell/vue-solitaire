import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('setBoard', (board) => {
  cy.window().should('have.property', 'appReady', true);

  const getStore = () => cy.window().its('app.$store');

  return getStore().then((store) =>
    store.dispatch('setBoardAndFoundation', board)
  );
});

Cypress.Commands.add('dragTo', { prevSubject: true }, (subject, dragTo) => {
  cy.get(subject).trigger('dragstart', {
    dataTransfer: new DataTransfer(),
    force: true,
  });

  cy.get(subject).should('have.css', 'opacity', '0');
  cy.get('[data-test="dragged-cards"]').should('be.visible');

  cy.get(dragTo)
    .trigger('drop')
    .trigger('dragend', { force: true });

  cy.get('[data-test="dragged-cards"]').should('not.be.visible');
});

Cypress.Commands.add('drag', { prevSubject: true }, (subject, x, y) => {
  cy.get(subject)
    .trigger('dragstart', 0, 0, {
      dataTransfer: new DataTransfer(),
      force: true,
    })
    .trigger('mousemove', x, y, {
      force: true,
    });
});

Cypress.Commands.add('clickTo', { prevSubject: true }, (subject, clickTo) => {
  cy.get(subject).click({ force: true });
  cy.get(clickTo).click({ force: true });
});

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
        cy.get(`[data-test="card-${element}"]`).should('not.be.visible');
      });
    });
  }
);

addMatchImageSnapshotCommand({
  failureThreshold: 0.05, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
});
