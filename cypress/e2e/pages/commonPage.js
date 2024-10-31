export class CommonPage {
  visitLink(url) {
    cy.visit(url);
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
  typeOnInputByDataTestId(inputDataTestId, inputValue) {
    cy.get(`[data-test=${inputDataTestId}]`)
      .should("have.value", "")
      .clear()
      .type(inputValue)
      .should("have.value", inputValue);
  }
  clickButtonByDataTestId(button) {
    cy.get(`[data-test=${button}]`).should("not.be.checked").click();
  }
  clickOnLogginButton() {
    cy.get('[data-test="login-button"]').should("not.be.checked").click();
  }
}
