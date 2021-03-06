import TestLayout from '../../src/www/ts/test-data/resource-table-layout.data'

describe('testing data table head', () => {
  const cols = TestLayout.columns,
    visCols = cols?.filter(col => col.visible === true) ?? [],
    dtC = '.gs-field-left'

  before('visit test site', () => {
    cy.visit('/dist/index.html')
    cy.get('.gs-slider-left').dragTo(
      Cypress.config('viewportWidth') - 10,
      null
    )
  })

  const getRowCells = (order: number): Cypress.Chainable =>
    cy.get(`.dt-body-cell[style*="order: ${order};"]`)

  cols?.forEach(col => {
    describe(`testing head cell '${col.caption}'`, () => {
      if (col.visible === true) {
        it(`exists head cell with text '${col.caption}'`, () =>
          cy
            .contains(`${dtC} .dt-head-cell-text`, col.caption ?? '')
            .parent()
            .should('exist'))

        if (col.width != null && col.width.includes('px'))
          it(`head cell has width '${col.width}'`, () =>
            cy
              .contains(`${dtC} .dt-head-cell`, col.caption ?? '')
              .invoke('outerWidth')
              .then(width =>
                expect(width).eq(parseInt(col.width ?? ''))
              ))

        if (col.width?.indexOf('px') !== -1)
          it(`change width of head cell`, () =>
            cy
              .contains(`${dtC} .dt-head-cell`, col.caption ?? '')
              .as('headCell')
              .invoke('outerWidth')
              .as('oldWidth')
              .then(oldWidth =>
                cy
                  .get('@headCell')
                  .find('.dt-head-cell-slider')
                  .drag(100, 10)
                  .then(() =>
                    cy
                      .get('@headCell')
                      .invoke('outerWidth')
                      .then(newWidth => {
                        expect((newWidth ?? 0) > (oldWidth ?? 0)).to
                          .be.true
                        getRowCells(col.visibleIndex)
                          .invoke('outerWidth')
                          .then(
                            newWidth =>
                              expect(
                                (newWidth ?? 0) > (oldWidth ?? 0)
                              ).to.be.true
                          )
                      })
                  )
              ))

        if (visCols.length > 1)
          it('change positon/index of cell', () => {
            cy.contains(
              `${dtC} .dt-head-cell-text`,
              col.caption ?? ''
            )
              .dragTo(10, null)
              .then(el =>
                expect(
                  parseInt(el[0].parentElement?.style.order ?? '0')
                ).eq(1)
              )
          })

        if (col.sortOrder != null)
          it('has sort mark', () => {
            cy.contains(
              `${dtC} .dt-head-cell-text`,
              col.caption ?? ''
            )
              .parent()
              .find(`.dt-head-sort-mark`)
              .as('sortMark')
              .should('exist')
            if (col.sortIndex != null)
              cy.get('@sortMark')
                .find('.dt-head-sort-svg-order-text')
                .should('contain.text', col.sortIndex)
          })
      } else
        it('head cell does not exist', () =>
          cy
            .contains(`${dtC} .dt-head-cell`, col.caption ?? '')
            .should('not.exist'))
    })
  })
})
