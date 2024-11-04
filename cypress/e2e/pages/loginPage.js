import { CommonPage } from "./commonPage";

export class LoginPage extends CommonPage {
  loginStandardUser(typeOfuser) {
    this.typeOnInputByDataTestId("username", typeOfuser);
    this.typeOnInputByDataTestId("password", "secret_sauce");
    this.clickButtonByDataTestId("login-button");
  }

  clickOnLogginButton() {
    this.clickButtonByDataTestId("login-button");
  }

  checkTextOfAnErrorMessage(errorMessageId, expectedValueForErrorMessage) {
    cy.get(`[data-test=${errorMessageId}]`).should(
      "contain",
      expectedValueForErrorMessage
    );
  }

  checkTextOfAnErrorMessageIsNotShown(
    errorMessageId,
    notExpectedValueForErrorMessage
  ) {
    cy.contains(
      `[data-test=${errorMessageId}]`,
      notExpectedValueForErrorMessage
    ).should("not.exist");
  }

  openSession(typeOfuser) {
    cy.session("loginSession", () => {
      cy.visit(Cypress.config("baseUrl")); //Visita la URL de inicio de sesión
      this.typeOnInputByDataTestId("username", typeOfuser);
      this.typeOnInputByDataTestId("password", "secret_sauce");
      this.clickOnLogginButton();
      cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
    });
  }

  navigateToMain() {
    cy.visit("/inventory.html", {
      failOnStatusCode: false,
    });
    cy.url().should("include", "/inventory.html");
  }

  loginKeepSession(typeOfuser) {
    this.openSession(typeOfuser);
    this.navigateToMain();
  }
}
