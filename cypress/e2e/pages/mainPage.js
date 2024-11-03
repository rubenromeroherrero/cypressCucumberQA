export class MainPage {
  checkCartIconBadgeNotExist() {
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");
  }

  addProductToCartByPosition(productListPosition) {
    const listOfAddToCartButtons = {
      first: 0,
      second: 1,
      third: 2,
      fourth: 3,
    };
    let indexAddTocartButtonPosition =
      listOfAddToCartButtons[productListPosition];

    cy.get('[data-test="inventory-item"]')
      .find('button:contains("Add to cart")')
      .eq(indexAddTocartButtonPosition)
      .should("be.visible")
      .click();
  }

  //Segunda manera de hacer click en botón a partir de nombre
  addProductToCartByName(productName) {
    cy.get('[data-test="inventory-item"]')
      .contains(".btn btn_primary btn_small btn_inventory ", productName)
      .click();
  }

  //Tecerca manera de hacer click en botón a partir de data-test + name
  addProductToCartByName2(productName) {
    let AddToCartByProductNameDataTest = productName
      .toLowerCase()
      .replace(/ /g, "-");
    // La variable AddToCartByProductNameDataTest se crea para que el valor sea igual al data-test del botón Add to cart reemplazando los espacios por guiones y en minúsculas
    cy.get('[data-test="inventory-item"]')
      .find(`[data-test="add-to-cart-${AddToCartByProductNameDataTest}"]`)
      .should("contain", "Add to cart")
      .click();
  }

  checkNumberOfCartIconBadge(elementId, numberShoppingCartProducts) {
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

  checkValueOfProductByPositionOnTheList(
    productListPosition,
    productData,
    expectedValue
  ) {
    const positionLogic = {
      first: 0,
      second: 1,
      third: 2,
      fourth: 3,
    };
    let indexPosition = positionLogic[productListPosition];

    if (productListPosition != "last") {
      cy.get(`[data-test="inventory-item-${productData}"]`)
        .eq(indexPosition)
        .should("contain", expectedValue);
    } else {
      cy.get(`[data-test="inventory-item-${productData}"]`)
        .last()
        .should("contain", expectedValue);
    }
  }
}
