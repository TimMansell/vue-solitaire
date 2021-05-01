describe('User', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('it stores id in local storage', () => {
    const luid = localStorage.getItem('luid');

    expect(luid).to.not.equal('');
  });
});
