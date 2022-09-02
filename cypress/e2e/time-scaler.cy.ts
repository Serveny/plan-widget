describe('testing time scaler', () => {
  before('visit test site', () => {
    cy.visit('/dist/index.html')
  })

  const getCon = (): Cypress.Chainable =>
    cy.get('.plw-endless-scroller')

  it('has container elements', () => {
    getCon().should('be.visible')
  })
})
