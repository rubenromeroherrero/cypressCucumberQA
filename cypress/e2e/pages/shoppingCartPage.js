export class ShoppingCartPage {
  checkInventoryItemNotExist() {
    cy.get('[data-test="inventory-item"]').should("not.exist");
  }

  checkInventoryItemExist() {
    cy.get('[data-test="inventory-item"]').should("be.visible");
  }
}
