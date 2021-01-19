describe('System navigation', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('can open the navigation menu', () => {
    cy.get('[data-testid=nav-menu-button]').click();
    cy.get('[data-testid=nav-menu').contains('Navigation').click();
    cy.get('[data-testid=nav-menu').contains('Saturn').should('be.visible');
  });

  it('can navigate to the sun', () => {
    cy.get('[data-testid=nav-menu').contains('Sun').click();
    cy.get('[data-testid=sun').should('be.visible');
  });

  it('can navigate to the belt', () => {
    cy.get('[data-testid=nav-menu').contains('The Belt').click();
    cy.get('[data-testid=belt-ref').should('be.visible');
  });

  it('can navigate to a planet', () => {
    cy.get('[data-testid=nav-menu').contains('Neptune').click();
    cy.get('[data-testid=neptune').should('be.visible');
  });
});
