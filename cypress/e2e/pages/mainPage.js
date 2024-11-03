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

  /*
  Hay varias cosas que no me gustan de esta función:
  1º el step es muy confuso, no se añade el producto 2, 3, 4 o 5, se añade el producto en la posición 2, 3, 4 o 5 de la lista,
  lo cual como sabes no es lo mismo que el primer, segundo, tercer o cuarto producto, ya que la posición parte del 0 por lo que
  cuando se añade el producto 2 se añade el tercer producto de la lista para que funcione como tu quieres yo haría lo siguiente:

  addAProductToCart(productListPosition) {
    cy.get('[data-test="inventory-item"]')
      .find('button:contains("Add to cart")')
      .eq(productListPosition - 1)  // De esta forma la posición si corresponderá con el puesto del producto en la lista
      .should("be.visible")
      .click();
  }

  Por otro lado cambiarñia el nombre de la función a addProductToCartByPosition para que sea más claro que se añade el producto por la posición en la lista
  Y el nombre del step sería "When I add to the cart the product in the {int} position in the list"

  */
  }

  /* 
  Ahora vamos a ver otra forma de hacer esta función, en lugar de pasar la posición de la lista como parámetro, 
  pasamos el nombre del producto que queremos añadir al carrito, de esta forma la función sería más clara y
  el step también sería más claro:
  */

  addProductToCartByName(productName) {
    cy.get('[data-test="inventory-item"]').contains('.btn btn_primary btn_small btn_inventory ', productName).click();
  }
  //También podría hacerse de otra forma, usando el data-test que existe en el botón Add to cart así:

  addProductToCartByName2(productName) {
    let AddToCartByProductNameDataTest = productName.toLowerCase().replace(/ /g, "-");
    // La variable AddToCartByProductNameDataTest se crea para que el valor sea igual al data-test del botón Add to cart reemplazando los espacios por guiones y en minúsculas
    cy.get('[data-test="inventory-item"]').find(`[data-test="add-to-cart-${AddToCartByProductNameDataTest}"]`).should('contain', 'Add to cart').click();
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
  /*
  Con respecto a esta función, hay varias cosas que no me gustan:
  1º La función no es clara, no se entiende que hace, yo la renombraría a checkValueOfProductInListByPosition
  y la simplificaría de la siguiente forma:
  */

  checkValueOfProductByPositionOnTheList(productPositionList, productData, expectedValue) {
    cy.get(`[data-test="inventory-item-${productData}"]`)
      .eq(productPositionList - 1)
      .should("contain", expectedValue); 
  }
}
