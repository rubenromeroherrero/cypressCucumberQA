import "cypress-mochawesome-reporter/cucumberSupport";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

//Clases importadas
import { MainPage } from "../pages/mainPage";
import { CommonPage } from "../pages/commonPage";

//Instancias de clases
let mainPage = new MainPage();
let commonPage = new CommonPage();

Given("I check that the {string} item {string}", (elementId, existProperty) => {
  //Si el elementId no existe use "does not exist" (como "existProperty"), cualquier otro valor se considerará que el elemento existe
  commonPage.checkIfAnElementExist(elementId, existProperty);
});

When(
  "I add to the cart the {string} product in the list",
  (productListPosition) => {
    mainPage.addProductToCartByPosition(productListPosition);
  }
);

When("I add to the cart the product with the name {string}", (productName) => {
  mainPage.addProductToCartByName2(productName);
});

When(
  "I check that the {string} contains the quantity {int}",
  (elementId, numberShoppingCartProducts) => {
    mainPage.checkNumberOfCartIconBadge(elementId, numberShoppingCartProducts);
  }
);

When("I check that the selected option is {string}", (defautOption) => {
  mainPage.checkValueOfSelectedOption(defautOption);
});

When(
  "I check that the {string} product in the list has the {string} attribute with the {string} value",
  (productListPosition, productData, expectedValue) => {
    mainPage.checkValueOfProductByPositionOnTheList(
      productListPosition,
      productData,
      expectedValue
    );
  }
);

When("I select the option {string}", (textValue) => {
  mainPage.selectAnOptionByText(textValue);
});

When(
  "I navigate to the {string} product detail through {string} link",
  (content, productId) => {
    mainPage.navigateToProductItemDetailByNameProduct(content, productId);
  }
);

Given(
  "I add to the shopping cart the {string} from Main page",
  (productName) => {
    mainPage.addProductToCartByText(productName);
  }
);

When("I navigate to Shopping Cart page", () => {
  commonPage.clickButtonByDataTestId("shopping-cart-link");
});
