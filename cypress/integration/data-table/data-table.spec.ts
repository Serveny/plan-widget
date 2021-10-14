import { DataTable } from '../../../src/www/ts/classes/data-table/data-table.class'

describe('testing data-table', () => {
  const testContainer = document.createElement('div'),
    dataTable = new DataTable(null).appendTo(testContainer),
    dataTableEl = testContainer.querySelector('.data-table') ?? null,
    headEl = dataTableEl?.querySelector('.dt-head') ?? null,
    bodyEl = dataTableEl?.querySelector('.dt-body') ?? null

  it('appends to container', () => expect(dataTableEl).not.to.be.null)
  it('has head', () => expect(headEl).not.to.be.null)
  it('has body', () => expect(bodyEl).not.to.be.null)

  const title = 'Test Table'
  it(`has title '${title}'`, () => {
    dataTable.setTitle(title)
    expect(dataTable.layout?.title).equal(title)
  })
})
