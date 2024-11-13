import "cypress-mochawesome-reporter/cucumberSupport";
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

Then(
  "I click on the button named {string} and wait for api call {string}",
  (buttonName, apiCall) => {
    commonPage.clickButtonByNameWaitCookies(buttonName, apiCall);
  }
);

Then("I click on the button named {string}", (buttonName) => {
  commonPage.clickButtonByName(buttonName);
});

Then(
  "I click on the button named {string} with a timeout of {int} miliseconds",
  (buttonName, timeoutParameter) => {
    commonPage.clickButtonByNameWithTimeout(buttonName, timeoutParameter);
  }
);

Then("I wait {int} miliseconds", (seconds) => {
  commonPage.waitXSeconds(seconds);
});

Then(
  "I intercept the api call {string} with the alias {string}",
  (apiCall, aliasApiCall) => {
    commonPage.interceptApiCallAddAlias(apiCall, aliasApiCall);
  }
);

Then(
  "I wait maximum of {int} miliseconds for the api call with the alias {string}",
  (time, aliasApiCall) => {
    commonPage.waitApiCallByAlias(time, aliasApiCall);
  }
);

Then("I test the accesibility in all the screen", () => {
  commonPage.testAccesibilityInScreen();
});

Then(
  "I test the accesibility on the element with locator {string}",
  (elementLocator) => {
    commonPage.testAccesbilityOnElement(elementLocator);
  }
);
