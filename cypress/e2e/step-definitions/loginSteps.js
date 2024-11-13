import "cypress-mochawesome-reporter/cucumberSupport";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Clases importadas
import { CommonPage } from "../pages/commonPage";
import { LoginPage } from "../pages/loginPage";

//Instancias de clase
let commonPage = new CommonPage();
let loginPage = new LoginPage();

When(
  "I type in the input {string} the value {string}",
  (inputDataTestId, inputValue) => {
    commonPage.typeOnInputByDataTestId(inputDataTestId, inputValue);
  }
);

When("I click on the {string} button", (button) => {
  commonPage.clickButtonByDataTestId(button);
});

When("I login with {string} user", (typeOfuser) => {
  cy.fixture("typeOfUsers").as("userName");
  cy.get("@userName").then((userDataName) => {
    switch (typeOfuser) {
      case "standard":
        loginPage.loginStandardUser(userDataName[0].username);
        break;
      case "locked out":
        loginPage.loginStandardUser(userDataName[1].username);
        break;
      case "problem":
        loginPage.loginStandardUser(userDataName[2].username);
        break;
      case "error":
        loginPage.loginStandardUser(userDataName[3].username);
        break;
      case "visual":
        loginPage.loginStandardUser(userDataName[4].username);
        break;
    }
  });
});

When("I login with keep session with {string} user", (typeOfuser) => {
  cy.fixture("typeOfUsers").as("userName2");
  cy.get("@userName2").then((userDataName2) => {
    switch (typeOfuser) {
      case "standard":
        loginPage.loginKeepSession(userDataName2[0].username);
        break;
      case "locked out":
        loginPage.loginKeepSession(userDataName2[1].username);
        break;
      case "problem":
        loginPage.loginKeepSession(userDataName2[2].username);
        break;
      case "error":
        loginPage.loginKeepSession(userDataName2[3].username);
        break;
      case "visual":
        loginPage.loginKeepSession(userDataName2[4].username);
        break;
    }
  });
});

When("I fill with {string} the fields of login", (contentField) => {
  cy.fixture("typeOfUsers").as("userName");
  switch (contentField) {
    case "blank data":
      break;
    case "empty username":
      commonPage.typeOnInputByDataTestId("password", "secret_sauce");
      break;
    case "empty password":
      cy.get("@userName").then((userDataName) => {
        commonPage.typeOnInputByDataTestId(
          "username",
          userDataName[0].username
        );
      });
      break;
  }
});

When(
  "I check that the {string} message is {string}",
  (errorMessageId, expectedValueForErrorMessage) => {
    loginPage.checkTextOfAnErrorMessage(
      errorMessageId,
      expectedValueForErrorMessage
    );
  }
);

When(
  "I check that the {string} message {string} is not shown",
  (errorMessageId, notExpectedValueForErrorMessage) => {
    loginPage.checkTextOfAnErrorMessageIsNotShown(
      errorMessageId,
      notExpectedValueForErrorMessage
    );
  }
);
