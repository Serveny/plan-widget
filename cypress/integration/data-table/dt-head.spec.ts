import { DtHead } from '../../../src/www/ts/classes/data-table/dt-head.class'
import TestHelper from '../../support/test-helper.class'
import TestLayout from '../../test-data/table-layout.data'

describe('testing data table head', () => {
  const dtHead = new DtHead(TestLayout),
    visColsCount = TestLayout.columns?.filter(col => 
      col.visible === true).length

  it('visit test site', () => {
    cy.visit('integration-test.html') 
    cy.get('body').then((el: JQuery<HTMLBodyElement>) => 
    el.append(dtHead.el)) 
  })

  it(`has ${visColsCount} head cells`, () =>
    cy.get('.dt-head').children()
      .then(el => expect(el.length)
        .equal(visColsCount)))

  TestLayout.columns?.forEach((col) => {

    if (col.visible === true) {
      it(`exists head cell with text '${col.caption}'`, () => { 
        cy.contains('.dt-head-cell-text', col.caption ?? '')
          .parent().should('be.visible')
      })

      it(`head cell has width '${col.width}'`, () => {
        cy.contains('.dt-head-cell', col.caption ?? '')
            .invoke('outerWidth').then(width => 
              expect(width).eq(parseInt(col.width ?? '')))
      })

      if(col.width?.indexOf('px') !== -1) {
        it('change width of head cell', () => {
          cy.contains('.dt-head-cell', col.caption ?? '')
          .as('headCell').invoke('outerWidth').then(oldWidth =>
            cy.get('@headCell').find('.dt-head-cell-slider')
            .as('slider').should('be.visible').trigger('mousedown').wait(1000)
            .then(() => cy.get('@headCell').trigger('mousemove', {
              clientX: oldWidth ?? 0 + 10, clientY : 10,
            }).invoke('outerWidth').then(newWidth => 
              expect(newWidth).eq((oldWidth ?? 0) + 10)
            ))
          )
        })
      }
                
    } else it('head cell does not exist', () =>
      cy.contains('.dt-head-cell', col.caption ?? '')
        .should('not.exist'))
  })
})