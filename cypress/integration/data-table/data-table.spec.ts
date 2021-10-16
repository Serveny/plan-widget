import { DataTable } from '../../../src/www/ts/classes/data-table/data-table.class'

describe('testing data-table', () => {
  const testContainer = document.createElement('div'),
    dataTable = new DataTable(null).appendTo(testContainer)

    it('visit test site', () => {
      cy.visit('integration-test.html') 
      cy.get('body').then((el: JQuery<HTMLBodyElement>) => 
      el.append(testContainer)) 
    })

  it('append to container', () => 
    cy.get('.data-table').should('be.visible'))
  it('has head', () => 
    cy.get('.dt-head').should('be.visible'))
  it('has body', () => 
    cy.get('.dt-body').should('be.visible'))

  const title = 'Test Table'
  it(`has title '${title}'`, () => {
    dataTable.setTitle(title)
    expect(dataTable.layout?.title).equal(title)
    cy.get('.dt-head').should('have.text', title)
  })
})
