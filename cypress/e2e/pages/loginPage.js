import { CommonPage } from "./commonPage";

export class LoginPage extends CommonPage {
  loginStandardUser(typeOfuser) {
    this.typeOnInputByDataTestId("username", typeOfuser);
    this.typeOnInputByDataTestId("password", "secret_sauce");
    this.clickButtonByDataTestId("login-button");
  }

  checkTextOfAnErrorMessage(errorMessageId, expectedValueForErrorMessage) {
    cy.get(`[data-test=${errorMessageId}]`).should(
      "contain",
      expectedValueForErrorMessage
    );
  }
}
