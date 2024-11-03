import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

//Clases importadas
import { MainPage } from "../pages/mainPage";
import { CommonPage } from "../pages/commonPage";

//Instancias de clases
let mainPage = new MainPage();
let commonPage = new CommonPage();

Given("I check that the {string} item {string}", (elementId, existProperty) => {
  commonPage.checkIfAnElementExist(elementId, existProperty);
  /* 
  Este paso debería de estar en commonStep no en mainSteps
  por otro lado, es una buena práctica para pasos que solo admiten un if y un else, indicar el valor del if como comentario, por ejemplo:
  Si el elementId no existe use "does not exist" (como "existProperty"), cualquier otro valor se considerará que el elemento existe
  */
});

When(
  "I add to the cart the {int} product in the list",
  (productListPosition) => {
    mainPage.addAProductToCart(productListPosition);
  }
);

When(
  "I check that the {string} contains the number {int}",
  (elementId, numberShoppingCartProducts) => {
    mainPage.checkCartIconBadgeContainNumber(
      elementId,
      numberShoppingCartProducts
    );
  }
);

When("I check that the selected option is {string}", (defautOption) => {
  mainPage.checkValueOfSelectedOption(defautOption);
});

When(
  "I check that the {string} product in the list has the {string} {string}",
  (orderProductId, productData, expectedValue) => {
    mainPage.checkValueOfProductsList(
      orderProductId,
      productData,
      expectedValue
    );
  }
);

When("I select the option {string}", (textValue) => {
  mainPage.selectAnOptionByText(textValue);
});


When("I add to the cart the product with the name {string}",(productName) => {
    mainPage.addProductToCartByName2(productName);
});


// Diferente step para comprobar valores de atributos de un producto por su posicion en la lista
When("I check that the product {int} in the position list has the {string} attribute with the {string} value", (productListPosition, productData, expectedValue) => { 
    mainPage.checkValueOfProductByPositionOnTheList(productListPosition, productData, expectedValue)
});