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

  const wheel = {
    down: { deltaY: 1 },
    up: { deltaY: -1 },
    left: { deltaX: -1 },
    right: { deltaX: 1 },
  },
    getXCon = (): Cypress.Chainable<JQuery<HTMLElement>> =>
      cy.get('.gs-field-right .plw-sb-con-x').as('sbcx'),
    getYCon = (): Cypress.Chainable<JQuery<HTMLElement>> =>
      cy.get('.gs-field-right .plw-sb-con-y').as('sbcy'),
    getSC = (): Cypress.Chainable<JQuery<HTMLElement>> =>
      cy.get('.gs-field-right .dt-scroll-container').as('sc'),
    checkBarX = (delta: { deltaY?: number; deltaX?: number; }, barOffsetType: string,
      comparer: string): Cypress.Chainable =>
      getXCon().find('.plw-scroll-bar').then(barEl => {
        const old = parseInt(barEl.css(barOffsetType))
        cy.get('@sbcx').trigger('wheel', delta).then(() =>
          cy.wrap(parseInt(barEl.css(barOffsetType))).should(comparer, old))
      }),
    checkBarY = (delta: { deltaY?: number; deltaX?: number; }, barOffsetType: string,
      comparer: string): Cypress.Chainable =>
      getYCon().find('.plw-scroll-bar').then(barEl => {
        const old = parseInt(barEl.css(barOffsetType))
        cy.get('@sbcy').trigger('wheel', delta).then(() =>
          cy.wrap(parseInt(barEl.css(barOffsetType))).should(comparer, old))
      }),
    checkScrollCon = (delta: { deltaY?: number; deltaX?: number; }, isTop: boolean,
      comparer: string): Cypress.Chainable => getSC().then(el => {
        const old = isTop ? el[0].scrollTop : el[0].scrollLeft
        cy.get('@sc').trigger('wheel', delta)
          .invoke(isTop ? 'scrollTop' : 'scrollLeft')
          .should(comparer, old)
      })
  describe('x-bar: testing mouse wheel handlers', () => {
    it('moves right on wheel down inside x-bar container', () =>
      checkBarX(wheel.down, 'margin-left', 'be.gt'))
    it('moves left on wheel up inside x-bar container', () =>
      checkBarX(wheel.up, 'margin-left', 'be.lt'))
    // ---
    it('moves right on wheel right inside x-bar container', () =>
      checkBarX(wheel.right, 'margin-left', 'be.gt'))
    it('moves left on wheel left inside x-bar container', () =>
      checkBarX(wheel.left, 'margin-left', 'be.lt'))
    // ---
    it('moves right on wheel right inside scroll container', () =>
      checkScrollCon(wheel.right, false, 'be.gt'))
    it('moves left on wheel left inside scroll container', () =>
      checkScrollCon(wheel.left, false, 'be.lt'))
  })

  describe('y-bar: testing mouse wheel handlers', () => {
    it('moves down on wheel down inside y-bar container', () =>
      checkBarY(wheel.down, 'margin-top', 'be.gt'))
    it('moves up on wheel up inside y-bar container', () =>
      checkBarY(wheel.up, 'margin-top', 'be.lt'))
    // ---
    it('moves down on wheel right inside y-bar container', () =>
      checkBarY(wheel.right, 'margin-top', 'be.gt'))
    it('moves up on wheel left inside y-bar container', () =>
      checkBarY(wheel.left, 'margin-top', 'be.lt'))
    // ---
    it('moves down on wheel down inside scroll container', () =>
      checkScrollCon(wheel.down, true, 'be.gt'))
    it('moves up on wheel up inside scroll container', () =>
      checkScrollCon(wheel.up, true, 'be.lt'))
  })
})