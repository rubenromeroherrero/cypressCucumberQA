///Locators on Main Page
const addToCartProductDetailPage = '[data-test="add-to-cart"]';
const productCard = '[data-test="inventory-item"]';

export class ProductDetailPage {
  addProductToCartByName(productName) {
    cy.get(addToCartProductDetailPage)
      .contains(productName)
      .should("contain", productName)
      .click();
  }

  //Tercera manera de hacer click en botón a partir de data-test + name
  addProductToCartByName2(productName) {
    let AddToCartByProductNameDataTest = productName
      .toLowerCase()
      .replace(/ /g, "-");
    // La variable AddToCartByProductNameDataTest se crea para que el valor sea igual al data-test del botón Add to cart reemplazando los espacios por guiones y en minúsculas
    cy.get(productCard)
      .find(`[data-test="add-to-cart-${AddToCartByProductNameDataTest}"]`)
      .should("contain", "Add to cart")
      .click();
  }
}
