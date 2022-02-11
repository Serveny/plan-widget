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
    drag(x: number, y: number): Cypress.Chainable<Subject>
    dragTo(
      x: number | null,
      y: number | null
    ): Cypress.Chainable<Subject>
  }
}

function drag(
  subject: JQuery,
  x: number,
  y: number
): Cypress.Chainable<JQuery> {
  const subj = cy.wrap(subject),
    el = subject[0],
    rect = el.getBoundingClientRect(),
    startX = rect.left + rect.width / 2,
    startY = rect.top + rect.height / 2
  subj
    .trigger('mousedown', {
      clientX: startX,
      clientY: startY,
    })
    .then(() =>
      cy.window().then(win => {
        win.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: startX + x,
            clientY: startY + y,
          })
        )
        win.dispatchEvent(new MouseEvent('mouseup'))
      })
    )
  return cy.wrap(subject)
}

function dragTo(
  subject: JQuery,
  x: number | null,
  y: number | null
): Cypress.Chainable<JQuery> {
  const subj = cy.wrap(subject),
    el = subject[0],
    rect = el.getBoundingClientRect(),
    startX = rect.left + rect.width / 2,
    startY = rect.top + rect.height / 2
  subj
    .trigger('mousedown', {
      clientX: startX,
      clientY: startY,
    })
    .then(() =>
      cy.window().then(win => {
        win.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: x ?? startX,
            clientY: y ?? startY,
          })
        )
        win.dispatchEvent(new MouseEvent('mouseup'))
      })
    )
  return cy.wrap(subject)
}

Cypress.Commands.add('drag', { prevSubject: 'element' }, drag)
Cypress.Commands.add('dragTo', { prevSubject: 'element' }, dragTo)

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
