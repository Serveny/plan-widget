import { DataTable } from '../../src/www/ts/classes/data-table/data-table.class'

describe('testing data-table', () => {
  const dataTable = new DataTable(null)

  before('visit test site', () => {
    cy.visit('integration-test.html')
    cy.get('body').then((bodyEl: JQuery<HTMLBodyElement>) =>
      dataTable.appendTo(bodyEl[0]))
  })

  it('append to container', () =>
    cy.get('.data-table').should('be.visible'))
  it('has head', () =>
    cy.get('.dt-head').should('be.visible'))
  it('has body', () =>
    cy.get('.dt-body').should('exist'))

  const title = 'Test Table'
  it(`has title '${title}'`, () => {
    dataTable.setTitle(title)
    expect(dataTable.layout?.title).equal(title)
    cy.contains('.dt-head', title).should('be.visible')
  })
})
