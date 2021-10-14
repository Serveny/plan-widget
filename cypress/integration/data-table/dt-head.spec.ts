import { DtHead } from '../../../src/www/ts/classes/data-table/dt-head.class'
import TestHelper from '../../support/test-helper.class'
import TestLayout from '../../test-data/table-layout.data'

describe('testing data table head', () => {
  const dtHead = new DtHead(TestLayout),
    headEl = dtHead.el,
    visColsCount = TestLayout.columns?.filter(col => 
      col.visible === true).length

  it(`has ${visColsCount} head cells`, () =>
    expect(headEl?.children.length).equal(visColsCount))

  TestLayout.columns?.forEach((col, i) => {
    if (col.visible === true) {
      it(`head cell has text '${col.caption}'`, () => {
        const textEl = headEl?.children[i]
          ?.querySelector('.dt-head-cell-text')
        expect(textEl?.textContent)
        .equals(col.caption)
      })

      it(`head cell has width '${col.width}'`, () => {
        const el = headEl?.children[i] as HTMLElement
        expect(el.style.width).equals(col.width)
      })

      if(col.width?.indexOf('px') !== -1) {
        it('change width of head cell', () => {
          const el = headEl?.children[i] as HTMLElement,
            oldWidth = parseInt(col.width ?? ''),
            sliderEl = el.querySelector(
              '.dt-head-cell-slider') as HTMLElement
          expect(sliderEl).not.to.be.null
          
          TestHelper.testDrag(sliderEl, 10, 0)
          expect(el.style.width).eq(`${oldWidth+10}px`)
        })
      }
    } else it('head cell does not exist', () =>
      expect(headEl?.children[i]).to.be.undefined)
  })
})