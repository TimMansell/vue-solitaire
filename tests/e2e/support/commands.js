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

Cypress.Commands.add('setDeck', (deck) => {
  const getStore = () => cy.window().its('app.$store');

  return getStore().then((store) => store.dispatch('dealTestCards', deck));
});

Cypress.Commands.add('setBoard', (board) => {
  const getStore = () => cy.window().its('app.$store');

  return getStore().then((store) => store.dispatch('setTestBoard', board));
});
