import { DataTable } from '../../src/www/ts/classes/data-table.class'
import TestLayout from '../test-data/table-layout.data'

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

  describe('testing layout functions', () => {
    dataTable.setLayout(TestLayout)
    const visColsCount = TestLayout.columns?.filter(col => 
      col.visible === true).length

    it(`has ${visColsCount} head cells`, () =>
      expect(headEl?.children.length).equal(visColsCount))

    TestLayout.columns?.forEach((col, i) => {
      if (col.visible === true) {
        it(`head cell has text '${col.caption}'`, () =>
          expect(headEl?.children[i]?.textContent)
            .equals(col.caption))

        it(`head cell has width '${col.width}'`, () => {
          const el = headEl?.children[i] as HTMLElement
          expect(el.style.width).equals(col.width)
        })
      } else it('head cell does not exist', () =>
        expect(headEl?.children[i]).to.be.undefined)
    })
  })
})
