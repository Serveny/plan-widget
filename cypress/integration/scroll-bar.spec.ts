describe('testing scroll bar', () => {
  before('visit test site', () => {
    cy.visit('/dist/index.html')
    // cy.get('.gs-slider-left')
    //   .dragTo(Cypress.config('viewportWidth') - 5, null)
  })

  it('has scroll bar elements', () => {
    cy.get('.gs-field-right .plw-sb-bar-x').as('sbx').should('exist')
    cy.get('.gs-field-right .plw-sb-bar-y').as('sby').should('exist')
    // cy.get('@sbx').find('.plw-sb-resize-field-left').should('exist')
    // cy.get('@sbx').find('.plw-sb-resize-field-right').should('exist')
  })

  it('x has end positon of 100%', () => {
    cy.get('.gs-field-right .plw-sb-bar-x').as('sb')
    cy.get('.gs-field-right .plw-sb-con-x').then(conEl =>
      cy.get('@sb').dragTo(conEl[0].getBoundingClientRect().left 
        + conEl[0].offsetWidth, null)
      .then(bar => expect(bar[0].offsetLeft + bar[0].offsetWidth)
        .eq(conEl[0].offsetWidth)))
  })

  it('x has end positon of 0%', () => {
    cy.get('.gs-field-right .plw-sb-bar-x').as('sb')
      cy.get('@sb').dragTo(0, null)
        .then(el => expect(el[0].offsetLeft).eq(0))
  })

  it('y has end positon of 100%', () => {
    cy.get('.gs-field-right .plw-sb-bar-y').as('sb')
    cy.get('.gs-field-right .plw-sb-con-y').then(conEl =>
      cy.get('@sb').dragTo(
        null, conEl[0].offsetTop + conEl[0].offsetHeight)
        .then(el => expect(el[0].offsetTop
          + el[0].offsetHeight).eq(conEl[0].offsetHeight)))
  })

  it('y has end positon of 0%', () => {
    cy.get('.gs-field-right .plw-sb-bar-y').as('sb')
      cy.get('@sb').dragTo(null, 0)
        .then(el => expect(el[0].offsetTop).eq(0))
  })
})