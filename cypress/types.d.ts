// reference code is written like below to avoid the clash in mocha types.
// in most of the cases, simple <reference types="cypress" /> will do.
/// <reference types="cypress" />

declare namespace Cypress {
  // add custom Cypress command to the interface Chainable<Subject>
  // eslint-disable-next-line
  interface Chainable<Subject = any> {
    isInViewport(selector: string): void;
    isNotInViewport(selector: string): void;
  }
}
