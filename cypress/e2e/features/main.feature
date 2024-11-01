Feature: Main test suite

    Background:
        Given I visit the url "https://www.saucedemo.com/"
        When I check that the url "not.include" the endpoint "/inventory"

    Scenario: Add the first product to the shopping cart
        Given I login with "standard" user
        And I check that the "shopping-cart-link" item "exists"
        And I check that the "shopping-cart-badge" item "does not exist"
        And I check that the url "include" the endpoint "/inventory"
        And I click on the "shopping-cart-link" button
        And I check that the url "include" the endpoint "/cart"
        And I check that the "inventory-item" item "does not exist"
        And I click on the "continue-shopping" button
        When I add to the cart the 2 product in the list
        And I check that the "shopping-cart-badge" contains the number 1
        And I click on the "shopping-cart-link" button
        And I check that the url "include" the endpoint "/cart"
        Then I check that the "inventory-item" item "exists"

    Scenario: Check the order after applying the filter by price
        Given I login with "standard" user
        And I check that the "active" option  is "Name (A to Z)"