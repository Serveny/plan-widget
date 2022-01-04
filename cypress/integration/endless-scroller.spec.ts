import { EndlessScroller } from '../../src/www/ts/classes/endless-scroller/endless-scroller.class'

describe('testing endless scroller', () => {
  const endlessScroller1 = new EndlessScroller(),
    endlessScroller2 = new EndlessScroller(),
    getLefts = (cells: JQuery<HTMLElement>): JQuery<number> =>
      cells.map((_, el) => parseInt(el.style.left)),
    checkMove = (additor: number,
      scroller: EndlessScroller): void => {
      cy.wrap(scroller.el).children('.plw-es-cell').then(cells => {
        const oldValues = getLefts(cells)
        scroller.move(additor)
        const newValues = getLefts(cells)
        oldValues.each((i, oldVal) => {
          expect((oldVal + additor)).eq(newValues[i])
        })
      })
    }

  before('visit test site', () => {
    cy.visit('integration-test.html')
    cy.get('body').then((bodyEl: JQuery<HTMLBodyElement>) => {
      endlessScroller1.appendTo(bodyEl[0])
      endlessScroller2.appendTo(bodyEl[0])
      endlessScroller1.paint()
      endlessScroller2.paint()
    })
  })

  it('moves to left', () => checkMove(-20, endlessScroller1))
  it('moves to right', () => checkMove(20, endlessScroller2))
})