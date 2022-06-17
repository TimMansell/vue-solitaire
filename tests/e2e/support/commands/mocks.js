import { mockUid, mockVersionNumber } from '../../../../src/mockData';

Cypress.Commands.add('mockVersionUpdate', () => {
  cy.mockVersion();

  cy.window()
    .its('solitaire.store')
    .then((store) => {
      store.dispatch('newUpdate', true);
    });
});

Cypress.Commands.add('mockVersion', (version = '') => {
  const mockVersion = version || mockVersionNumber;

  localStorage.setItem(mockVersion, 'value');
});

Cypress.Commands.add('mockIsOnline', (isOnline) =>
  cy
    .window()
    .its('solitaire.store')
    .then((store) => {
      store.dispatch('setIsOnline', isOnline);
    })
);

Cypress.Commands.add('mockUser', () => localStorage.setItem('luid', mockUid));

Cypress.Commands.add('mockBoard', (cards) => {
  const uid = localStorage.getItem('luid');

  cy.task('sendMsg', {
    name: 'mockDeck',
    payload: { uid, cards },
    responseName: 'newGame',
  }).then(() => {
    cy.window()
      .its('solitaire.store')
      .then((store) => {
        store.dispatch('initBoard', cards);
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
