import { DtHead } from '../../../src/www/ts/classes/data-table/dt-head.class'
import TestLayout from '../../../src/www/ts/test-data/table-layout.data'

describe('testing data table head', () => {
  const dtHead = new DtHead(null),
    title = 'Test-Title',
    cols = TestLayout.columns,
    visColsCount = cols?.filter(col =>
      col.visible === true).length ?? 0

  before('visit test site', () => {
    cy.visit('integration-test.html')
    cy.get('body').then((el: JQuery<HTMLBodyElement>) =>
      el.append(dtHead.el))
  })

  it(`has title '${title}'`, () => {
    dtHead.fill({ title: title })
    cy.contains('.dt-head', title).should('be.visible')
  })

  it(`has ${visColsCount} head cells`, () => {
    dtHead.fill(TestLayout)
    cy.get('.dt-head').children()
      .then(el => expect(el.length)
        .equal(visColsCount))
  })

  cols?.forEach((col, i) => {
    if (col.visible === true) {
      it(`exists head cell with text '${col.caption}'`, () =>
        cy.contains('.dt-head-cell-text', col.caption ?? '')
          .parent().should('be.visible'))

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
                .drag(200, 10).then(() =>
                  cy.get('@headCell').invoke('outerWidth')
                    .then(newWidth =>
                      expect(newWidth).eq((oldWidth ?? 0) + 200)))))

      if (visColsCount > 1)
        it('change positon/index of cell', () => {
          cy.contains('.dt-head-cell-text', col.caption ?? '')
            .as('headCell').then(el => {
              const isDragLeft = i >= (visColsCount - 1),
                oldIndex = col.visibleIndex,
                x = (isDragLeft ? el[0].getBoundingClientRect()
                  .width : 0) + 100
              console.log(isDragLeft, x)
              cy.get('@headCell').drag(isDragLeft ? -x : x, 10)
                .then(() => expect(col.visibleIndex)
                  .eq(oldIndex + (isDragLeft ? -1 : 1)))
            })

        })
    } else it('head cell does not exist', () =>
      cy.contains('.dt-head-cell', col.caption ?? '')
        .should('not.exist'))
  })
})