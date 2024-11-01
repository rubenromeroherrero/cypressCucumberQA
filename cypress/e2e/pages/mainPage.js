export class MainPage {
  checkCartIconBadgeNotExist() {
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");
  }

  addAProductToCart(productListPosition) {
    cy.get('[data-test="inventory-item"]')
      .find('button:contains("Add to cart")')
      //How can i change the eq filter
      .eq(productListPosition)
      .should("be.visible")
      .click();
  }

  checkCartIconBadgeContainNumber(elementId, numberShoppingCartProducts) {
    cy.get(`[data-test=${elementId}]`)
      .should("be.visible")
      .and("contain", numberShoppingCartProducts);
  }
}
