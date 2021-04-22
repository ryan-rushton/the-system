/**
 * A custom command to check whether the element is visible within the viewport.
 */
Cypress.Commands.add('isInViewport', (element) => {
  cy.get(element).should(($el) => {
    const bottom = Cypress.$(cy.state('window')).height();
    const right = Cypress.$(cy.state('window')).width();
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).to.be.within(0, bottom);
    expect(rect.bottom).to.be.within(0, bottom);
    expect(rect.left).to.be.within(0, right);
    expect(rect.right).to.be.within(0, right);
  });
});

/**
 * A custom command to check whether the element is not visible within the viewport.
 */
Cypress.Commands.add('isNotInViewport', (element) => {
  cy.get(element).should(($el) => {
    const bottom = Cypress.$(cy.state('window')).height();
    const right = Cypress.$(cy.state('window')).width();
    const rect = $el[0].getBoundingClientRect();

    expect(rect).to.satisfy(
      (toCheck) => toCheck.bottom < 0 || toCheck.top > bottom || toCheck.right < 0 || toCheck.left > right
    );
  });
});
