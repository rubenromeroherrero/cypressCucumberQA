describe("Intercepting requests and responses", () => {
  //Intercept for elements that we need to wait, or to mock data
  it("Intercepting requests and responses", () => {
    cy.intercept(
      "https://events.prd.api.max.com/dcp-svc-go/events-api/v1/events"
    ).as("hboMaxEvents");
    cy.visit("https://www.hbomax.com/");
    cy.wait("@hboMaxEvents", { timeout: 10000 });
    cy.contains("Aceptar todo", { timeout: 10 }).click();
  });
});
