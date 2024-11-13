import "cypress-mochawesome-reporter/cucumberSupport";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

//Clases importadas
import { CommonPage } from "../pages/commonPage";
import { MainPage } from "../pages/mainPage";
import { ProductDetailPage } from "../pages/productDetailPage";

//Instancias de clases
let commonPage = new CommonPage();
let mainPage = new MainPage();
let productDetailPage = new ProductDetailPage();

When(
  "I check that the product {string} the {string} attribute with {string}",
  (statusContent, elementDataTest, content) => {
    commonPage.checkElementContent(elementDataTest, statusContent, content);
  }
);

When(
  "I add a product in the Product Detail page after click in {string} button",
  (nameButton) => {
    productDetailPage.addProductToCartByName(nameButton);
  }
);

When(
  "I add to the shopping cart the {string} from Product Detail page",
  (productName) => {
    mainPage.navigateToProductItemDetailByNameProduct(
      productName,
      "inventory-item-name"
    );
    commonPage.checkElementContent(
      "inventory-item-name",
      "contain",
      productName
    );
    productDetailPage.addProductToCartByName("Add to cart");
  }
);
