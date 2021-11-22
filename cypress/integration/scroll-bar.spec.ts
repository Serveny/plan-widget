describe('testing scroll bar', () => {
  before('visit test site', () => {
    cy.visit('/dist/index.html')
    cy.get('.gs-slider-right')
      .dragTo(Cypress.config('viewportWidth') - 5, null)
  })

  it('has scroll bar elements', () => {
    cy.get('.gs-field-middle .plw-sb-x').as('sbx').should('exist')
    cy.get('@sbx').find('.plw-sb-resize-field-left').should('exist')
    cy.get('@sbx').find('.plw-sb-resize-field-right').should('exist') 
  })
})