describe('System display', () => {
  before(() => {
    // Increase the initial loading timeout as we wait for the app to get served in CI
    cy.visit('http://localhost:3000', { timeout: 120_000 });
  });

  it('can open the menu', () => {
    cy.get('[data-testid=nav-menu-button]').click();
    cy.get('[data-testid=nav-menu').should('be.visible');
  });

  it('can open the info menu', () => {
    cy.get('[data-testid=nav-menu').contains('Info').click();
    cy.get('[data-testid=nav-menu').contains('Show Orbits').should('be.visible');
  });

  it('can show the orbit lines', () => {
    cy.get('[data-testid=saturn-orbit-line]').should('not.have.css', 'border-color', 'rgba(255, 0, 0, 0.5)');
    cy.get('[data-testid=nav-menu').contains('Show Orbits').click();
    cy.get('[data-testid=saturn-orbit-line]').should('have.css', 'border-color', 'rgba(255, 0, 0, 0.5)');
  });

  it('can normalise the system dimensions', () => {
    cy.get('[data-testid=the-system]').should('have.css', 'height', '168045.171875px');
    cy.get('[data-testid=the-system]').should('have.css', 'width', '168045.171875px');

    cy.get('[data-testid=nav-menu').contains('Normalise Distance').click();

    cy.get('[data-testid=the-system]').should('have.css', 'height', '8353898px');
    cy.get('[data-testid=the-system]').should('have.css', 'width', '8353898px');
  });
});
