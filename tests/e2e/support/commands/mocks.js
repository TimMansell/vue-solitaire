import semverDecrement from 'semver-decrement';
import { mockUid } from '../../../../src/mockData';
import { version } from '../../../../package.json';

Cypress.Commands.add('mockLocalVersion', () => {
  const mockVersionNumber = semverDecrement(version, 'patch');

  cy.mockLocalAppVersion(`v${mockVersionNumber}`);
});

Cypress.Commands.add('mockVersion', (increment) =>
  cy.task('sendMsg', {
    name: 'mockVersion',
    payload: { mockVersion: version, increment },
  })
);

Cypress.Commands.add('mockLocalAppVersion', (versionName) =>
  localStorage.setItem(versionName, 'value')
);

Cypress.Commands.add('mockLegacyVersion', () => cy.mockLocalAppVersion('vuex'));

Cypress.Commands.add('mockIsOnline', (isOnline) =>
  cy
    .window()
    .its('solitaire.store')
    .then((store) => {
      store.dispatch('setIsOnline', isOnline);
    })
);

Cypress.Commands.add('mockUser', () => localStorage.setItem('luid', mockUid));

Cypress.Commands.add('mockBoard', (mockCards) => {
  const uid = localStorage.getItem('luid');

  cy.task('sendMsg', {
    name: 'mockDeck',
    payload: { uid, mockCards },
    responseName: 'newGame',
  }).then(() => {
    cy.window()
      .its('solitaire.store')
      .then((store) => {
        store.dispatch('initBoard', mockCards);
      });
  });
});

Cypress.Commands.add('mockPaused', (isPaused) =>
  cy
    .window()
    .its('solitaire.store')
    .then((store) => {
      store.dispatch('setGamePaused', isPaused);
    })
);
