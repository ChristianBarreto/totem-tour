const baseURL = 'http://127.0.0.1:5001/totem-tour/us-central1/totem';

describe("Store page tests", () => {
  beforeEach(() => {

  });

  it.only("Should do all store and checkout process.", () => {
    cy.intercept('GET', `${baseURL}/cities/*`).as('getCities')
    cy.intercept('GET', `${baseURL}/availabilities/**`).as('getAvailabilities')

    cy.visit('/totem/store');

    cy.log("🚩 Should show cities")
    cy.wait('@getCities').then((citiesResp) => {
      console.log(">>>", citiesResp?.response.body)
    });

    cy.contains('Búzios');
    cy.contains('Cabo Frio');
    
    cy.log("🚩 Should show products")
    cy.contains('Passeio de Escuna em Búzios').click();

    cy.log("🚩 Should show product modal")
    cy.wait('@getAvailabilities').then(() => {
      cy.get('[data-cy="date-selector"]')
        .find('option')
        .eq(2)
        .then(element => cy.get('[data-cy="date-selector"]').select(element.val()))
    });

    cy.get('[data-cy="adults-qty-selector"]')
      .find('button')
      .should('be.enabled')
    cy.get('[data-cy="free-qty-selector"]')
      .find('button')
      .should('be.disabled')
    cy.get('[data-cy="half-qty-selector"]')
      .find('button')
      .should('be.disabled')

    cy.get('[data-cy="adults-qty-selector"]')
      .find('button')
      .contains('+')
      .click()
    cy.get('[data-cy="free-qty-selector"]')
      .find('button')
      .should('be.enabled')
      .contains('+')
      .click()
    cy.get('[data-cy="half-qty-selector"]')
      .find('button')
      .should('be.enabled')
      .contains('+')
      .click()

    cy.get('[data-cy="total-qty-display"]').should('have.text', '3 pessoas');

    cy.get('[data-cy="price-display"]')
      .should('include.text', "R$")
      .should('include.text', "135,00")

    cy.contains("Adicionar ao carrinho").click();

    cy.log("🚩 Should add products to cart")
    cy.get('[data-cy="cart-title"]').contains("Carrinho de compras")
    cy.get('[data-cy="cart-item-name"]').contains("Passeio de Escuna em Búzios")
    cy.get('[data-cy="cart-item-price"]').contains("R$ 135,00")
    cy.get('[data-cy="cart-item-city"]').contains("Cidade: Búzios")
    cy.get('[data-cy="cart-item-qty"]').contains("Quant. pessoas: 3")
    cy.get('[data-cy="cart-item-remove"]').contains("Remove")
    cy.get('[data-cy="cart-total-price"]').contains("R$ 135,00")
    cy.get('[data-cy="cart-continue-shopping"]').contains("Continuar comprando")
    cy.get('[data-cy="cart-checkout-button"]')
      .contains("Reservar")
      .click()

    cy.log("🚩 Should get user data on checkout process")
    cy.get('[data-cy="user-name"]').should('have.focus');
    cy.get('[data-skbtnuid="default-r3b0"]').click();
    cy.get('[data-skbtn="A"]').click();
    cy.get('[data-skbtn="s"]').click();
    cy.get('[data-skbtn="d"]').click();
    cy.get(':nth-child(5) > .hg-functionBtn').click();
    cy.get('[data-skbtnuid="default-r3b0"]').click();
    cy.get('[data-skbtn="A"]').click();
    cy.get('[data-skbtn="s"]').click();
    cy.get('[data-skbtn="d"]').click();

    cy.get('[data-cy="user-email"]').click();
    cy.get('[data-cy="user-email"]').should('have.focus');
    cy.get('[data-skbtn="a"]').click();
    cy.get('[data-skbtn="s"]').click();
    cy.get('[data-skbtn="d"]').click();
    cy.get('[data-skbtn="@"]').click();
    cy.get('[data-skbtn="a"]').click();
    cy.get('[data-skbtn="s"]').click();
    cy.get('[data-skbtn="d"]').click();
    cy.get('[data-skbtn="."]').click();
    cy.get('[data-skbtn="c"]').click();
    cy.get('[data-skbtn="o"]').click();
    cy.get('[data-skbtn="m"]').click();

    cy.get('[data-cy="user-phone"]').click();
    cy.get('[data-cy="user-phone"]').should('have.focus');
    cy.get('[data-skbtn="2"]').click();
    cy.get('[data-skbtn="2"]').click();
    cy.get('[data-skbtn="9"]').click();
    cy.get('[data-skbtn="9"]').click();
    cy.get('[data-skbtn="9"]').click();
    cy.get('[data-skbtn="9"]').click();
    cy.get('[data-skbtn="9"]').click();
    cy.get('[data-skbtn="9"]').click();
    cy.get('[data-skbtn="9"]').click();
    cy.get('[data-skbtn="9"]').click();
    cy.get('[data-skbtn="9"]').click();

    cy.get('[data-cy="checkout-next-button"]')
      .should('be.enabled')
      .click();

    cy.log("🚩 User should be able to choose the available payment methods")
    cy.log("🚩 Should be possible to pay and see the success status")

  });
})