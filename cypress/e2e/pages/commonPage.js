export class CommonPage {
  visitLink(url) {
    cy.visit(url, { failOnStatusCode: false });
  }

  //[No parametrizable]
  checkIfEndpointIsContained(endpoint) {
    cy.url().should("contain", endpoint);
  }

  //[No parametrizable]
  checkIfEndpointIsNotContained(endpoint) {
    cy.url().should("not.contain", endpoint);
  }

  //Analizar en una func si contiene o no contiene un endpoint la url [parametrizable]
  checkEndpoint(includeProperty, endpoint) {
    cy.url().should(includeProperty, endpoint);
  }

  checkElementContent(elementDataTest, statusContent, content) {
    cy.get(`[data-test="${elementDataTest}"]`)
      .contains(content)
      .should(statusContent, content);
  }

  checkIfAnElementExist(elementId, existProperty) {
    if (
      existProperty === "does not exist" ||
      existProperty === "not exist" ||
      existProperty === "not.exist"
    ) {
      cy.get(`[data-test=${elementId}]`).should("not.exist");
    } else {
      cy.get(`[data-test=${elementId}]`).should("be.visible");
    }
  }

  typeOnInputByDataTestId(inputDataTestId, inputValue) {
    //Analyze the value of the input when we want to use ""
    if (inputValue) {
      cy.get(`[data-test=${inputDataTestId}]`)
        .should("have.value", "")
        .clear()
        .type(inputValue)
        .should("have.value", inputValue);
    }
  }

  clickButtonByDataTestId(button) {
    cy.get(`[data-test=${button}]`).should("not.be.checked").click();
  }

  clickButtonByNameWithTimeout(buttonName, timeoutParameter) {
    cy.contains("button", buttonName, { timeout: timeoutParameter }).click();
  }

  waitXSeconds(seconds) {
    cy.wait(seconds);
  }

  interceptApiCallCookiesHbo() {
    cy.intercept("**/ot_guard_logo.svg").as("hboCookies");
  }
  interceptApiCallAddAlias(apiCall, alias) {
    cy.intercept(apiCall).as(alias);
  }

  waitApiCallByAlias(time, aliasApiCall) {
    cy.wait("@" + aliasApiCall, { timeout: time });
  }
  clickButtonByNameWaitCookies(buttonName, apiCall) {
    cy.intercept(apiCall).as("cookiesLoad");
    cy.wait("@cookiesLoad", { timeout: 4000 });
    cy.contains(buttonName).click();
  }

  testAccesibilityInScreen() {
    cy.injectAxe();
    cy.checkA11y();
  }

  testAccesbilityOnElement(elementLocator) {
    cy.injectAxe();
    cy.checkA11y(elementLocator);
  }
}
