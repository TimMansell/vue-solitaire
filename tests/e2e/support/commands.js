import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
// import '@4tw/cypress-drag-drop';

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

Cypress.Commands.add('dragFromTo', (dragFrom, dragTo) => {
  cy.get(`[data-test="${dragFrom}"]`)
    .trigger('dragstart', {
      dataTransfer: new DataTransfer(),
      eventConstructor: 'DragEvent',
      force: true,
    })
    .trigger('mousemove', 0, 0, {
      force: true,
    });

  cy.get(`[data-test="dragged-cards"] [data-test="${dragFrom}"]`).should(
    'be.visible'
  );

  cy.get(`[data-test="columns"] [data-test="${dragFrom}"]`).should(
    'not.be.visible'
  );

  cy.get(`[data-test="${dragTo}"]`)
    .trigger('drop', { force: true })
    .trigger('dragend', { force: true });

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500);

  cy.get('[data-test="dragged-cards"]')
    .children()
    .should('have.length', 0);
});

Cypress.Commands.add('drag', { prevSubject: true }, (subject, x, y) => {
  cy.get('[data-test="columns"]').within(() => {
    cy.get(subject)
      .trigger('dragstart', 0, 0, {
        dataTransfer: new DataTransfer(),
        force: true,
      })
      .trigger('mousemove', x, y, {
        force: true,
      });
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
        cy.get(`[data-test="card-${element}"]`).should('not.exist');
      });
    });
  }
);

Cypress.Commands.add('checkPlayerCount', () => {
  const query = `query {
    globalStats {
      players
    }
  }`;

  cy.intercept({
    method: 'POST',
    url: '.netlify/functions/graphql',
  }).as('apiCheck');

  cy.request({
    method: 'POST',
    url: '/.netlify/functions/graphql',
    body: { query },
    failOnStatusCode: false,
  }).should(({ status, body }) => {
    const { players } = body.data.globalStats;

    expect(status).to.equal(200);

    cy.visit('/');

    cy.wait('@apiCheck');

    cy.get('[data-test="player-count"]').should('have.text', players);
  });
});

Cypress.Commands.add('newGame', ({ wait }) => {
  cy.get('[data-test="new-game-btn"]').click();

  cy.get('[data-test="game-overlay-btns"]').within(() => {
    cy.get('[data-test="new-game-btn"]').click();
  });

  if (wait) {
    cy.wait('@apiCheck');
  }
});

addMatchImageSnapshotCommand({
  failureThreshold: 0.05, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
});
