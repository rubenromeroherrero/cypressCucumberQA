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

  checkValueOfSelectedOption(defautOption) {
    cy.get('[data-test="product-sort-container"]')
      .find("option:selected")
      .should("contain", defautOption);
  }

  selectAnOptionByText(textValue) {
    cy.get('[data-test="product-sort-container"]').select(textValue);
    cy.get('[data-test="product-sort-container"]')
      .find("option:selected")
      .should("contain", textValue);
  }

  checkValueOfProductsList(orderProductId, productData, expectedValue) {
    let indexPosition = 0;
    if (orderProductId == "second") {
      ++indexPosition;
    } else if (orderProductId == "third") {
      ++indexPosition;
    } else if (orderProductId == "forth") {
      ++indexPosition;
    } else if (orderProductId == "five") {
      ++indexPosition;
    }

    if (orderProductId != "last") {
      cy.get(`[data-test="inventory-item-${productData}"]`)
        //How can i change the eq filter
        .eq(indexPosition)
        .should("contain", expectedValue);
    } else {
      cy.get(`[data-test="inventory-item-${productData}"]`)
        .last()
        .should("contain", expectedValue);
    }
  }
}
