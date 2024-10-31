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
    }
  });
});

When("I fill with {string} the fields of login", (contentField) => {
  cy.fixture("typeOfUsers").as("userName");
  switch (contentField) {
    case "blank data":
      commonPage.clickOnLogginButton();
      break;
    case "empty username":
      commonPage.typeOnInputByDataTestId("password", "secret_sauce");
      commonPage.clickOnLogginButton();
      break;
    case "empty password":
      cy.get("@userName").then((userDataName) => {
        commonPage.typeOnInputByDataTestId(
          "username",
          userDataName[0].username
        );
        commonPage.clickOnLogginButton();
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
