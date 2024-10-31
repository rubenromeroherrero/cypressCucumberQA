import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Clases importadas
import { CommonPage } from "../pages/commonPage";

//Instancias de clase
let commonPage = new CommonPage();

//La partícula da igual Given, When, Then => Se puede usar luego con cualquier partícula aunque lo tengamos como un Given
Given("I visit the url {string}", (url) => {
  commonPage.visitLink(url);
});

When(
  "I check that the url {string} the endpoint {string}",
  (includeProperty, endpoint) => {
    commonPage.checkEndpoint(includeProperty, endpoint);
  }
);
