import { CommonPage } from "./commonPage";

///Locators on Main Page
const sortContainer = '[data-test="product-sort-container"]';
const productCard = '[data-test="inventory-item"]';
const productCardDescription = '[data-test="inventory-item-description"]';
const shoppingCartIcon = '[data-test="shopping-cart-badge"]';
const addToCartButtonText = "Add to cart";

export class MainPage extends CommonPage {
  checkCartIconBadgeNotExist() {
    // cy.get(shoppingCartIcon, { timeout: 6000 }).should("not.exist");
    cy.get(shoppingCartIcon).should("not.exist");
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

    cy.get(productCard)
      .find('button:contains("Add to cart")')
      .eq(indexAddTocartButtonPosition)
      .should("be.visible")
      .click();
  }

  addProductToCartByText(productName) {
    this.getAddToCartButtonAfterCheckTheProductName(productName).click();
  }

  getAddToCartButtonAfterCheckTheProductName(productName) {
    return cy
      .get(productCard)
      .contains(productCardDescription, productName)
      .should("contain", productName)
      .find(`button:contains(${addToCartButtonText})`)
      .should("contain", addToCartButtonText);
  }

  navigateToProductItemDetailByNameProduct(content, productId) {
    this.getProductIdByNameProduct(content, productId).click();
  }

  getProductIdByNameProduct(content, productId) {
    return cy
      .get(`[data-test="${productId}"]`)
      .contains(content)
      .should("contain", content);
  }

  checkNumberOfCartIconBadge(elementId, numberShoppingCartProducts) {
    cy.get(`[data-test=${elementId}]`)
      .should("be.visible")
      .and("contain", numberShoppingCartProducts);
  }

  //A partir de 3 reps es recomendable usarlo
  getActiveSortingOption() {
    return cy.get(sortContainer).find("option:selected");
  }

  checkValueOfSelectedOption(defautOption) {
    this.getActiveSortingOption().should("contain", defautOption);
  }

  selectAnOptionByText(textValue) {
    cy.get('[data-test="product-sort-container"]').select(textValue);
    this.getActiveSortingOption().should("contain", textValue);
  }

  checkValueOfTheLastProductOnTheList(productData, expectedValue) {
    cy.get(productData).last().should("contain", expectedValue);
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
      this.checkValueOfTheLastProductOnTheList(
        `[data-test="inventory-item-${productData}"]`,
        expectedValue
      );
    }
  }
}
