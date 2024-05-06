/**
 * A custom command to check whether the element is visible within the viewport.
 */
Cypress.Commands.add('isInViewport', (selector) => {
  cy.get(selector).should(($el) => {
    const bottom = Cypress.config('viewportHeight');
    const right = Cypress.config('viewportWidth');
    const rect = $el[0].getBoundingClientRect();

    expect(rect.top).to.be.within(0, bottom, `${selector} is above the viewport`);
    expect(rect.bottom).to.be.within(0, bottom, `${selector} is below the viewport`);
    expect(rect.left).to.be.within(0, right, `${selector} is to the left of the viewport`);
    expect(rect.right).to.be.within(0, right, `${selector} is to the right of the viewport`);
  });
});

/**
 * A custom command to check whether the element is not visible within the viewport.
 */
Cypress.Commands.add('isNotInViewport', (selector) => {
  cy.get(selector).should(($el) => {
    const bottom = Cypress.config('viewportHeight');
    const right = Cypress.config('viewportWidth');
    const rect = $el[0].getBoundingClientRect();

    expect(rect).to.satisfy(
      (toCheck) => toCheck.bottom < 0 || toCheck.top > bottom || toCheck.right < 0 || toCheck.left > right,
      `${selector} is within 0, 0, ${right}, ${bottom}`,
    );
  });
});
