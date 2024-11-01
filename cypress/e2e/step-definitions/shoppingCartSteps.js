import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

//Clases importadas
import { ShoppingCartPage } from "../pages/shoppingCartPage";

//Instancias de clases
let shoppingCartPage = new ShoppingCartPage();

When("I check that element inventory item does not exist", () => {
  shoppingCartPage.checkInventoryItemNotExist();
});

Then("I check that element inventory item exists", () => {
  shoppingCartPage.checkInventoryItemExist();
});
