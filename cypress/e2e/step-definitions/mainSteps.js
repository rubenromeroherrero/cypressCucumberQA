import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

//Clases importadas
import { MainPage } from "../pages/mainPage";
import { CommonPage } from "../pages/commonPage";

//Instancias de clases
let mainPage = new MainPage();
let commonPage = new CommonPage();

Given("I check that the {string} item {string}", (elementId, existProperty) => {
  commonPage.checkIfAnElementExist(elementId, existProperty);
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
