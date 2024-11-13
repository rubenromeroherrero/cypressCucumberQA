import "cypress-mochawesome-reporter/cucumberSupport";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

//Clases importadas
import { ShoppingCartPage } from "../pages/shoppingCartPage";
import { CommonPage } from "../pages/commonPage";

//Instancias de clases
let shoppingCartPage = new ShoppingCartPage();
let commonPage = new CommonPage();

When("I check that element inventory item does not exist", () => {
  shoppingCartPage.checkInventoryItemNotExist();
});

Then("I check that element inventory item exists", () => {
  shoppingCartPage.checkInventoryItemExist();
});

When(
  "I check that product {string} is added in Shopping Cart page",
  (productName) => {
    commonPage.clickButtonByDataTestId("shopping-cart-link");
    commonPage.checkElementContent(
      "inventory-item-name",
      "contain",
      productName
    );
    commonPage.checkIfAnElementExist("add-to-cart", "not exist");
    commonPage.checkIfAnElementExist("remove-sauce-labs-backpack", "exists");
  }
);
