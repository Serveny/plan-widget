/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
declare namespace Cypress {
  interface Chainable<Subject> {
    drag(x: number, y: number): Cypress.Chainable<Subject>;
  }
}

function drag(subject: JQuery, x: number, y: number): Cypress.Chainable<JQuery> {
  const subj = cy.wrap(subject),
    startX = subject[0].getBoundingClientRect().right,
    startY = subject[0].getBoundingClientRect().bottom
  subj.trigger('mousedown').trigger('mousemove', {
    clientX: startX + x, clientY: startY + y,
  }).trigger('mouseup')
  return subj
}

Cypress.Commands.add('drag', { prevSubject: 'element'}, drag)

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => {
//   console.log(subject, options)
// })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
