@regression @accesibility
Feature: Accesibility test suite

    Background: Visit and login wiht valid credentials
        Given I login with keep session with "standard" user

    Scenario: Test the accesibility in all the screen
        Then I test the accesibility in all the screen

    Scenario: Test the accesibility on the element "Acceso"
        Then I test the accesibility on the element with locator '[data-test="inventory-container"]'

    Scenario: Test the accesibility on the element "Filtro"
        Then I test the accesibility on the element with locator '[data-test="product-sort-container"]'

    Scenario: Test the accesibility on the Product Detail page
        Given I navigate to the "Sauce Labs Bike Light" product detail through "inventory-item-name" link
        Then I test the accesibility in all the screen

    Scenario: Test the accesibility on Remove button from Shopping Cart Page
        Given I add to the shopping cart the "Sauce Labs Backpack" from Main page
        And I navigate to Shopping Cart page
        Then I test the accesibility on the element with locator '[data-test="remove-sauce-labs-backpack"]'
