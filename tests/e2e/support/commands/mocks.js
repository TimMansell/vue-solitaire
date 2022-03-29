import semver from 'semver';
import { version } from '../../../../package.json';
import { mockUid } from '../../../../src/mockData';

Cypress.Commands.add('mockVersionUpdate', () =>
  cy
    .window()
    .its('solitaire.$store')
    .then((store) => {
      store.dispatch('checkVersion', semver.inc(version, 'patch'));
    })
);

Cypress.Commands.add('mockIsOnline', (isOnline) =>
  cy
    .window()
    .its('solitaire.$store')
    .then((store) => {
      store.dispatch('setIsOnline', isOnline);
    })
);

Cypress.Commands.add('mockUser', () => localStorage.setItem('luid', mockUid));

Cypress.Commands.add('mockBoard', (cards) => {
  const uid = localStorage.getItem('luid');

  cy.window()
    .its('solitaire.$store')
    .then((store) => {
      store.dispatch('initBoard', cards);
    });

  cy.task('mockServerDeck', { cards, uid });
});

Cypress.Commands.add('mockPaused', (isPaused) =>
  cy
    .window()
    .its('solitaire.$store')
    .then((store) => {
      store.dispatch('setGamePaused', isPaused);
    })
);
