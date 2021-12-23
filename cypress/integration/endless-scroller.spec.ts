import { EndlessScroller } from '../../src/www/ts/classes/endless-scroller/endless-scroller.class'

describe('testing endless scroller', () => {
  const endlessScroller = new EndlessScroller()

  before('visit test site', () => {
    cy.visit('integration-test.html')
    cy.get('body').then((bodyEl: JQuery<HTMLBodyElement>) =>
      endlessScroller.appendTo(bodyEl[0]))
  })


})