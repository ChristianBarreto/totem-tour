const fallbackSlideURL = 'https://firebasestorage.googleapis.com/v0/b/totem-tour.appspot.com/o/slides%2F0-fallback-slide-DO-NOT-DELETE.jpg**'
const baseURL = 'http://127.0.0.1:5001/totem-tour/us-central1/totem';

describe('Slides page tests', () => {

  beforeEach(() => {
    cy.intercept('GET', fallbackSlideURL).as('fbSlide');
    cy.intercept('GET', `${baseURL}/slides/`).as('slides');

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
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/totem/store")
    })
  })
})