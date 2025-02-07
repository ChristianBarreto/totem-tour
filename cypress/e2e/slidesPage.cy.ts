const fallbackSlideURL = 'https://firebasestorage.googleapis.com/v0/b/totem-tour.appspot.com/o/slides%2F0-fallback-slide-DO-NOT-DELETE.jpg**'

describe('Slides page tests', () => {

  beforeEach(() => {
    cy.intercept('GET', fallbackSlideURL).as('fbSlide');
    cy.intercept('GET', `**/slides*`).as('slides');

    cy.visit('/totem');
  });

  it('Should receive fallback slide', () => {
    cy.wait('@fbSlide').then((fbSlideResp) => {
      expect(fbSlideResp?.response.statusCode).to.be.oneOf([200, 304]);
    });
  });

  it('Should receive slides', () => {
    cy.wait("@slides").then((slidesResp) => {
      expect(slidesResp?.response.statusCode).to.be.oneOf([200, 304]);
    });
  })

  it('When click anywhere it should go to store page', () => {
    cy.get('div').click();
    cy.url().should('include', '/totem/store')
  })
})