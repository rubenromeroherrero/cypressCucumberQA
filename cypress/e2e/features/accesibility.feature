Feature: Main test suite

    Background: Visit and login wiht valid credentials
        Given I login with keep session with "standard" user

    Scenario: Test the accesibility in all the screen
        Then I test the accesibility in all the screen

    Scenario: Test the accesibility on the element "Acceso"
        Then I test the accesibility on the element with locator '[data-test="inventory-container"]'

    Scenario: Test the accesibility on the element "Filtro"
        Then I test the accesibility on the element with locator '[data-test="product-sort-container"]'
