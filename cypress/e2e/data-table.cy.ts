import { DataTable } from '../../src/www/ts/classes/data-table/data-table.class'
import { DemoData } from '../../src/www/ts/demo-data'
import { HorizontalTextAlign } from '../../src/www/ts/enums/horizontal-text-align.enum'
import { IResourceView } from '../../src/www/ts/interfaces/i-view.interface'
import TestLayout from '../../src/www/ts/test-data/resource-table-layout.data'

describe('testing data-table', () => {
  const dataTable = new DataTable<IResourceView>(
      'test-id',
      null,
      'en',
      true,
      true
    ),
    dd = new DemoData()

  before('visit test site', () => {
    cy.visit('integration-test.html')
    cy.get('body').then((bodyEl: JQuery<HTMLBodyElement>) =>
      dataTable.appendTo(bodyEl[0])
    )
  })

  it('appends to container', () =>
    cy.get('.data-table').should('be.visible'))
  it('has head', () => cy.get('.dt-head').should('be.visible'))
  it('has body', () => cy.get('.dt-body').should('exist'))

  const title = 'Test Table'
  it(`has title '${title}'`, () => {
    dataTable.setTitle(title)
    cy.contains('.dt-head', title).should('be.visible')
  })

  it(`shows data as rows`, () => {
    const rows = dd.Resources
    dataTable.setLayout(TestLayout)
    dataTable.addRows(rows)
    rows.forEach((_, i) =>
      cy
        .get(`.dt-row[style*="order: ${i};"]`)
        .should('exist')
        .then(el =>
          TestLayout.columns?.forEach(col => {
            const colEl = el.children(
              `.dt-body-cell[style*="order: ${col.visibleIndex};"]`
            )
            expect(colEl.length).eq(col.visible ? 1 : 0)
            if (col.visible) {
              expect(colEl.css('width')).eq(col.width)
              expect(colEl.css('text-align')).eq(
                col.textAlign != null
                  ? HorizontalTextAlign[col.textAlign].toLowerCase()
                  : undefined
              )
            }
          })
        )
    )
  })

  const newName = 'New Resource 6'
  it('updates row cell', () => {
    dataTable.updateRows([{ ID: 'R6', Name: newName }])
    cy.contains('.dt-body-cell', newName).should('exist')
  })

  it('removes row', () => {
    dataTable.removeRows(['R6'])
    cy.contains('.dt-row', newName).should('not.exist')
  })
})
