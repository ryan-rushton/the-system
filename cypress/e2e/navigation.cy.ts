/**
 * Tests for navigation around the system. This tests the scrolling interactions around the page when
 * an item is selected in the navigation menu.
 *
 */
describe('System navigation', () => {
  const activeButtonColor = 'rgb(135, 206, 235)';

  before(() => {
    // Increase the initial loading timeout as we wait for the app to get served in CI
    cy.visit('/', { timeout: 120_000 });
  });

  it('can open the navigation menu', () => {
    cy.get('[data-testid=nav-menu-button]').click();
    cy.get('[data-testid=nav-menu').contains('Navigation').click();
    cy.get('[data-testid=nav-menu').contains('Saturn').should('be.visible');
  });

  it('can navigate to the belt', () => {
    cy.get('[data-testid=nav-menu').contains('button', 'The Belt').click();
    cy.isInViewport('[data-testid=belt-ref');
  });

  it('can navigate to a planet', () => {
    reloadAndOpenNavMenu();

    cy.get('[data-testid=nav-menu').contains('button', 'Neptune').click();
    cy.isInViewport('[data-testid=neptune');
  });

  it('follows a planet', () => {
    reloadAndOpenNavMenu();

    const height = Cypress.config('viewportHeight');
    const width = Cypress.config('viewportWidth');

    cy.get('[data-testid=nav-menu').contains('button', 'Venus').click();
    cy.get('[data-testid=nav-menu').contains('Venus').should('have.css', 'color', activeButtonColor);
    cy.isInViewport('[data-testid=venus');
    cy.scrollTo(width, height);
    cy.isInViewport('[data-testid=venus');
  });

  it('shows a notification when you follow a planet', () => {
    reloadAndOpenNavMenu();

    cy.get('[data-testid=nav-menu').contains('button', 'Uranus').click();
    cy.get('[data-testid=nav-menu').contains('Uranus').should('have.css', 'color', activeButtonColor);
    cy.isInViewport('[data-testid=uranus');
    cy.get('[data-testid=notification-view').should(
      'have.text',
      'You will now follow Uranus around the system. Click Uranus again to stop following.',
    );
  });
});

function reloadAndOpenNavMenu() {
  cy.reload();
  cy.get('[data-testid=nav-menu-button]').click();
  cy.get('[data-testid=nav-menu').contains('Navigation').click();
}
