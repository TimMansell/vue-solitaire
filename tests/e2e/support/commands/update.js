import semver from 'semver';
import { version } from '../../../../package.json';

Cypress.Commands.add('waitForGameNumberToUpdate', () =>
  cy
    .get('[data-test="global-stats"]')
    .formatNumber()
    .then((number) => {
      cy.waitUntil(() =>
        cy
          .get('[data-test="global-stats"]')
          .formatNumber()
          .then((number2) => number2 !== number)
      );
    })
);

Cypress.Commands.add('mockVersionUpdate', () =>
  cy
    .window()
    .its('solitaire.$store')
    .then((store) => {
      store.dispatch('checkVersion', semver.inc(version, 'patch'));
    })
);
