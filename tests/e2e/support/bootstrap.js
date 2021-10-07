Cypress.Commands.add('visitApp', () => {
  cy.interceptAPIs();

  cy.visit('/', {
    onBeforeLoad() {
      localStorage.setItem('version', '0.0.1');
    },
  });
});
