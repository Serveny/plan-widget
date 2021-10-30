import TestLayout from '../../src/www/ts/test-data/table-layout.data'

describe('testing data table head', () => {
  const // title = 'Test-Title',
    cols = TestLayout.columns,
    visColsCount = cols?.filter(col =>
      col.visible === true).length ?? 0

  before('visit test site', () => {
    cy.visit('/dist/index.html')
  })

  // it(`has title '${title}'`, () => {
  //   dtHead.fill({ title: title })
  //   cy.contains('.dt-head', title).should('be.visible')
  // })

  // it(`has ${visColsCount} head cells`, () => {
  //   dtHead.fill(TestLayout)
  //   cy.get('.dt-head').children()
  //     .then(el => expect(el.length)
  //       .equal(visColsCount))
  // })

  cols?.forEach((col, i) => {
    if (col.visible === true) {
      it(`exists head cell with text '${col.caption}'`, () =>
        cy.contains('.dt-head-cell-text', col.caption ?? '')
          .parent().should('be.visible'))

      if (col.width != null && col.width.includes('px'))
        it(`head cell has width '${col.width}'`, () =>
          cy.contains('.dt-head-cell', col.caption ?? '')
            .invoke('outerWidth').then(width =>
              expect(width).eq(parseInt(col.width ?? ''))))

      if (col.width?.indexOf('px') !== -1)
        it(`change width of head cell`, () =>
          cy.contains('.dt-head-cell', col.caption ?? '')
            .as('headCell').invoke('outerWidth').as('oldWidth')
            .then(oldWidth =>
              cy.get('@headCell').find('.dt-head-cell-slider')
                .drag(100, 10).then(() =>
                  cy.get('@headCell').invoke('outerWidth')
                    .then(newWidth =>
                      expect((newWidth ?? 0) > (oldWidth ?? 0)).to.be.true))))

      if (visColsCount > 1)
        it('change positon/index of cell', () =>
          cy.contains('.dt-head-cell-text', col.caption ?? '')
            .as('txtCell').then(el => {
              const toLeft = i >= (visColsCount - 1),
                oldIndex = col.visibleIndex,
                x = (toLeft ? el[0].getBoundingClientRect()
                  .width : 0) + parseInt(cols[i + (toLeft ? -1 : 1)]
                    ?.width ?? '0')
              console.log(toLeft, x)
              cy.contains('.dt-head-cell', col.caption ?? '')
                .drag(toLeft ? -x : x, 10).then(el =>
                  expect(parseInt(el[0].style.order ?? '0'))
                    .eq(oldIndex + (toLeft ? -1 : 1))
                )
            }))
    } else it('head cell does not exist', () =>
      cy.contains('.dt-head-cell', col.caption ?? '')
        .should('not.exist'))
  })
})