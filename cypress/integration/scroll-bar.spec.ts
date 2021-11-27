describe('testing scroll bar', () => {
  before('visit test site', () => {
    cy.visit('/dist/index.html')
    cy.get('.gs-slider-right')
      .dragTo(Cypress.config('viewportWidth') - 5, null)
  })

  it('has scroll bar elements', () => {
    cy.get('.gs-field-middle .plw-sb-bar-x').as('sbx').should('exist')
    cy.get('@sbx').find('.plw-sb-resize-field-left').should('exist')
    cy.get('@sbx').find('.plw-sb-resize-field-right').should('exist')
  })

  it('has end positon of 100%', () => {
    cy.get('.gs-field-left .plw-sb-bar-x').as('sb').should('exist')
    cy.get('.gs-field-left .plw-sb-con-x').then(conEl =>
      cy.get('@sb').dragTo(conEl[0].offsetLeft + conEl[0].offsetWidth, null)
        .then(el => expect(parseInt(el[0].style.marginLeft)
          + el[0].offsetWidth).eq(conEl[0].offsetWidth)))
  })
})